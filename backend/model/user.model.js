const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		require: [true, 'Name is required']
	},
	description: {
		type: String,
		required: [true, 'Description is required']
	},

	collageName: {
		type: String,
		required: [true, 'Collage name is required']
	},
	profilePhoto: String,
	collagePassout: {
		type: Number,
		required: [true, 'Collage passout year is required']
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, 'Please provide a valid email']
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		minLength: [6, 'Password must be at least 6 character long'],
	},

	passwordConfirm: {
		type: String,
		required: [true, 'Password confirmation is required'],
		validate: {
			validator: function (value) {
				return value === this.password
			},
			message: 'Password do not match'
		}
	},
	passwordChangeAt: Date,
	passwordResetToken: String,
	passwordResetExpires: Date,
	active: { type: Boolean, default: false },
	isAdmin: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now }
})



userSchema.pre('save', async function (next) {
	if (!this.isModified('password') || this.isNew) {
		return next();
	}

	// Hash the password
	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = undefined;
	next();
});


userSchema.pre('save', async function (next) {
	if (!this.isModified('password') || this.isNew) {
		return next();
	}

	// Hash the password
	this.passwordChangeAt = Date.now() - 1000; //  to account for the time taken to hash the password

	next();
});


userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
	return bcrypt.compare(candidatePassword, userPassword);
};


userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
	if (this.passwordChangeAt) {
		const changedTimestamp = parseInt(this.passwordChangeAt.getTime() / 1000, 10);
		return changedTimestamp > JWTTimestamp;
	}

	// False for users who have no passwordChangeAt
	return false;
};


userSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString('hex');

	this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
	this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

	return resetToken;
};

module.exports = mongoose.model('User', userSchema)