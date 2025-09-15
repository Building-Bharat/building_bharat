const mongoose = require("mongoose");


const questionShcema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	options: {
		type: [String],
		required: true,
		validate: {
			validator: function (arr) {
				return arr.length == 4
			},
		},
		message: "array must contain 4 options"
	},
	answer: {
		type: Number,
		required: true,
		validate: {
			validator: function (val) {
				return val >= 0 && val < this.options.length;
			},
		},
		message: "answer shoulb be with in the range"
	},
	assignment: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Assignment",
		required: true,
	}
}, { timestamps: true });

module.exports = mongoose.model('Question', questionShcema);