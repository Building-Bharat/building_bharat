const { trace } = require("console");
const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: [10, "minimum 10 character required"],
	},

	video: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Video",
		required: true,
	}],

	assignment: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Assignment",
		required: true
	}],


	courseId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Course",
		required: true
	}
}, { timestamps: true });

module.exports = mongoose.model('Module', moduleSchema);