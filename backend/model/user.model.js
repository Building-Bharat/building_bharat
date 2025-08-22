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

module.exports = mongoose.model('User', userSchema)