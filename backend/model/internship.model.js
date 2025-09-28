const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true,
	},
	internshipThumbnail: {
		type: String,
		required: true,
	},
	skills: [{
		type: [String],
		required: true
	}],
	duration: {
		type: Number,
		required: true,
		validate: {
			validator: function (value) {
				return value > 0;
			},
			message: 'Duration must be positive'
		}
	},
	stipend: {
		type: Number,
		required: true
	},
	applyBy: {
		type: Date,
		required: true
	},
	applications: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}],
	allEligible: {

	}
}, { timestamps: true });

module.exports = mongoose.model('Internship', internshipSchema);