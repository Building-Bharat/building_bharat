const User = require('../model/user.model');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
//sing in token
const signToken = (id) => {
	return jwt.sign({ userId: id }), process.env.JWT_SECRET, {
		expiredIn: process.env.JWT_EXPIRES_IN || '30d'
	}
};


function createSendToken(newUser, statusCode, res) {
	const token = signToken(newUser._id);
	const tokenOption = {
		expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
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

exports.register = async (req, res) => {
	const newUser = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		passwordConfirm: req.body.passwordConfirm
	});

	createSendToken(newUser, 201, res);
};


exports.login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({
			error: "All fields are required"
		});
	};


	const user = await User.findOne({ email });

	if (!user || !(await user.correctPassword(password, user.password))) {
		return res.status(400).json({
			error: "Invalid email or password"
		});
	}

	createSendToken(user, 200, res);
};

exports.protect = async (req, res, next) => {
	let token;

	if (req.header.authorization && req.header.authorization.startsWith('Bearer')) {
		token = req.header.authorization.split(' ')[1];
	}

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


		if (currentUser.chagePasswordAfter(docoded.iat)) {
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

	if (!user) {
		return next(new Error('There is no user with this email address.'));
	};

	const resetToken = user.createPassordResetToken();
	await user.save({ validateBeforeSave: false });

	const resetURL = `${req.protocol}://${req.get('host')}/api/v1/auth/reset-password/${resetToken}`;

	const message = 'Forget your password? submit a Patch request with your new password and passwordConfirm to:';

	try {
		await sendEmail({
			email: user.email,
			subject: 'Your password reset token (valid for 10 min)',
			message
		})

		res.status(200).json({
			status: 'success',
			message: 'Token sent to email!'
		});
	} catch (err) {
		user.createPassordResetToken = undefined;;
		user.passwordResetExpires = undefined;
		await user.save({ validateBeforeSave: false });


		return next(
			new Error('There was an error sending the email. Try again later!')
		)
	}
};

exports.resetPassword = async (req, res, next) => {
	const
}