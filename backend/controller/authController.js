const User = require('../model/user.model');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const catchAsync = require('./../utils/catchAsync');
const crypto = require('crypto');

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

exports.emailSignUp = catchAsync(async (req, res) => {
	const newUser = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		passwordConfirm: req.body.passwordConfirm
	});

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

		const currentUser = await User.findById(decoded.userId);
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


