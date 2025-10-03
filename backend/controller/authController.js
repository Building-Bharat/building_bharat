const User = require('../model/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const catchAsync = require('./../utils/catchAsync');
const crypto = require('crypto');
const sendEmail = require('../service/email.service');
const { OAuth2Client } = require('google-auth-library');
const Admin = require('../model/admin.model');
require('dotenv').config();

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//generate otp
function generateOTP() {
	return Math.floor(1000 + Math.random() * 9000).toString();
}


//sing in token
const signToken = (id) => {
	return jwt.sign({ userId: id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN || '30d'
	})
};


function createSendToken(newUser, statusCode, res) {
	const token = signToken(newUser._id);
	const tokenOption = {
		// expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
		httpOnly: true
	}

	res.cookie('jwt', token, tokenOption);

	newUser.password = undefined; // Remove password from response
	res.status(statusCode).json({
		status: 'success',
		token,
		data: {
			user: newUser
		}
	});
}

async function generateOtpVerify(newUser) {
	try {
		const otp = generateOTP();
		console.log('Generated OTP:', otp);  // Debug log

		if (!otp) {
			throw new Error('OTP generation failed');
		}

		const hashedOtp = await bcrypt.hash(otp, 10);


		newUser.otp = hashedOtp;
		newUser.otpExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes


		await newUser.save({ validateBeforeSave: false });


		// Send OTP to user's email
		await sendEmail({
			to: newUser.email,
			subject: 'Your OTP for Signup',
			text: `Your OTP is ${otp}. It expires in 10 minutes.`
		});

	}
	catch (err) {
		console.error(`this is otp error ` + err.message);
	}
}

exports.emailSignUp = catchAsync(async (req, res) => {
	

	const newUser = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		passwordConfirm: req.body.passwordConfirm,
		
	});

	await generateOtpVerify(newUser);

	createSendToken(newUser, 201, res);
});


exports.loginEmail = catchAsync(async (req, res) => {
	const { email, password } = req.body;

	console.log('Email:', email);
	// console.log('User from DB:', user);

	if (!email || !password) {
		return res.status(400).json({
			error: "All fields are required"
		});
	};


	const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

	if (!user || !(await user.correctPassword(password, user.password))) {
		return res.status(400).json({
			error: "Invalid email or password"
		});
	}

	createSendToken(user, 200, res);
});

exports.protect = async (req, res, next) => {
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
	}
	console.log(req.headers.authorization);

	if (!token) {
		return res.status(401).json({
			error: "You are not logged in! Please log in to get access."
		});
	}

	try {
		const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
		let currentUser=undefined
		if(decoded.role=='admin')
		    currentUser = await Admin.findById(decoded.id);
	    else
			currentUser = await User.findById(decoded.userId); 
		if (!currentUser) {
			return res.status(401).json({
				error: "The user belonging to this token does no longer exist."
			});
		}
		if (currentUser.changedPasswordAfter(decoded.iat)) {
			return next({
				error: "User recently changed password! Please log in again."
			});
		}     
		req.user = currentUser;
		req.user.role=decoded.role
		next();
	} catch (err) {
		console.error(err);
		res.status(500).json({
			error: "Internal server error"
		});
	}
};

exports.restrictTo = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			console.log(req.user.role)
			return res.status(403).json({
				error: "You do not have permission to perform this action"
			});
		}
		next();
	}
}


exports.forgotPassword = async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });
	try {

		if (!user) {
			return next(new Error('There is no user with this email address.'));
		};

		const resetToken = user.createPasswordResetToken();

		await user.save({ validateBeforeSave: false });

		const resetURL = `${req.protocol}://${req.get('host')}/api/v1/auth/reset-password/${resetToken}`;

		console.log(`Password reset token for ${user.email}: ${resetToken}`);
		console.log(`Reset URL (for Postman testing): ${resetURL}`)

		res.status(200).json({
			status: 'success',
			message: 'Token generated!'
		})
	} catch (err) {
		console.error(err);


		if (user) {
			user.passwordResetToken = undefined;
			user.passwordResetExpires = undefined;

			await user.save({ validateBeforeSave: false });
		}

		return next(new Error(`problem to generate the reset token`));

	};
};

exports.resetPassword = async (req, res, next) => {
	const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

	const user = await User.findOne({
		passwordResetToken: hashedToken,
		passwordResetExpires: { $gt: Date.now() }
	});

	if (!user) {
		return next(new Error('Token is invalid or has expired'));
	}

	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	user.passwordResetToken = undefined;
	user.passwordResetExpires = undefined;

	await user.save();

	res.status(200).json({
		status: 'success',
		message: 'Password reset successful! Please log in.'
	});

	createSendToken(user, 200, res);
};


exports.updatePassword = async (req, res, next) => {
	const user = await User.findById(req.user.id).select('+password');

	if (!user || !(await user.correctPassword(req.body.passwordCurrent, user.password))) {
		return res.status(401).json({
			error: 'Your current password is wrong.'
		});
	}

	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	await user.save();

	res.status(200).json({
		status: 'success',
		message: 'Password updated successfully!'
	});

	createSendToken(user, 200, res);
};


exports.verifyOTP = catchAsync(async (req, res) => {
	const { email, otp } = req.body;

	const user = await User.findOne({ email }).select('+otp +otpExpiresAt');


	console.log({ user });
	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}

	if (user.otpExpiresAt < Date.now()) {
		return res.status(400).json({ message: 'OTP expired' });
	}
	console.log(user.otp);

	const isMatch = await bcrypt.compare(otp, user.otp);

	if (!isMatch) {
		return res.status(400).json({ message: 'Invalid OTP' });
	}

	user.isVerified = true;
	user.otp = undefined;
	user.otpExpiresAt = undefined;
	await user.save({ validateBeforeSave: false });

	res.status(200).json({
		status: 'success',
		message: 'Email verified successfully'
	});
});

// Send OTP for forgot password
exports.sendOtpForReset = catchAsync(async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		return res.status(400).json({ msg: 'User not found' });
	}
	const otp = Math.floor(1000 + Math.random() * 9000).toString();
	const hashedOtp = await bcrypt.hash(otp, 10);
	user.otp = hashedOtp;
	user.otpExpiresAt = Date.now() + 5 * 60 * 1000;
	await user.save({ validateBeforeSave: false });

	await sendEmail({
		to: email,
		subject: 'Your OTP Code',
		text: `Your OTP is ${otp}, valid for 5 minutes.`
	});
	res.json({ msg: 'OTP sent to email' });
});

// Verify OTP specifically for password reset
exports.verifyOtpForReset = catchAsync(async (req, res) => {
	const { email, otp } = req.body;
	if (!email || !otp) {
		return res.status(400).json({ msg: 'Email or OTP missing' });
	}
	const user = await User.findOne({ email }).select('+otp +otpExpiresAt');
	if (!user) {
		return res.status(400).json({ msg: 'User not found' });
	}
	if (!user.otp || user.otpExpiresAt < Date.now()) {
		return res.status(400).json({ msg: 'Invalid or expired OTP' });
	}
	const isMatch = await bcrypt.compare(otp, user.otp);
	if (!isMatch) {
		return res.status(400).json({ msg: 'Invalid or expired OTP' });
	}
	user.otp = undefined;
	user.otpExpiresAt = undefined;
	await user.save({ validateBeforeSave: false });
	res.json({ msg: 'OTP verified for password reset' });
});

// Reset password using email + newPassword
exports.resetPasswordSimple = catchAsync(async (req, res) => {
	const { email, newPassword } = req.body;
	const user = await User.findOne({ email }).select('+password');
	if (!user) {
		return res.status(400).json({ msg: 'User not found' });
	}
	user.password = newPassword;
	user.passwordConfirm = newPassword;
	await user.save();
	res.json({ msg: 'Password reset successfully' });
});

// Send OTP for login
exports.sendLoginOtp = catchAsync(async (req, res) => {
	const { emailOrPhone } = req.body;
	const user = await User.findOne({
		$or: [{ email: emailOrPhone }, { phone: emailOrPhone }]
	});
	if (!user) {
		return res.status(400).json({ msg: 'User not found' });
	}
	const otp = Math.floor(1000 + Math.random() * 9000).toString();
	const hashedOtp = await bcrypt.hash(otp, 10);
	user.otp = hashedOtp;
	user.otpExpiresAt = Date.now() + 5 * 60 * 1000;
	await user.save({ validateBeforeSave: false });
	await sendEmail({
		to: user.email,
		subject: 'Your Login OTP',
		text: `Your OTP is ${otp}, valid for 5 minutes.`
	});
	res.json({ msg: 'Login OTP sent', email: user.email });
});

// Verify login OTP and issue JWT
exports.verifyLoginOtp = catchAsync(async (req, res) => {
	const { email, emailOrPhone, otp } = req.body;
	const identifier = email || emailOrPhone;
	const user = await User.findOne({
		$or: [{ email: identifier }, { phone: identifier }]
	}).select('+otp +otpExpiresAt');
	if (!user) {
		return res.status(400).json({ msg: 'User not found' });
	}
	if (!user.otp || user.otpExpiresAt < Date.now()) {
		return res.status(400).json({ msg: 'Invalid or expired OTP' });
	}
	const isMatch = await bcrypt.compare(otp, user.otp);
	if (!isMatch) {
		return res.status(400).json({ msg: 'Invalid or expired OTP' });
	}
	user.otp = undefined;
	user.otpExpiresAt = undefined;
	await user.save({ validateBeforeSave: false });
	createSendToken(user, 200, res);
});


// Google signup/login using ID token from Google One Tap or OAuth
exports.googleAuth = catchAsync(async (req, res) => {
	const { credential } = req.body;
	if (!credential) {
		return res.status(400).json({ msg: 'Missing credential' });
	}

	const ticket = await googleClient.verifyIdToken({
		idToken: credential,
		audience: process.env.GOOGLE_CLIENT_ID
	});
	const payload = ticket.getPayload();
	const email = payload && payload.email;
	if (!email) {
		return res.status(400).json({ msg: 'No email in Google token' });
	}

	let user = await User.findOne({ email });
	if (!user) {
		const randomPassword = Math.random().toString(36).slice(-12);
		const hashed = await bcrypt.hash(randomPassword, 10);
		user = await User.create({
			email,
			password: hashed,
			passwordConfirm: hashed,
			googleId: payload.sub,
			name: payload.name || email.split('@')[0]
		});
	} else if (!user.googleId) {
		user.googleId = payload.sub;
		await user.save({ validateBeforeSave: false });
	}

	createSendToken(user, 200, res);
});