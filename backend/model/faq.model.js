const mongoose = require("mongoose");

const frequentQuestionSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: [10, 'question name should be at least 10 character long']
	},
	description: {
		type: String,
		required: true,
		minLength: [10, 'answer should be at least 10 character long']
	},
	courseId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Course",
		required: true
	}
});

module.exports = mongoose.model('Faq', frequentQuestionSchema);