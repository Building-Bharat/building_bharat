const mongoose = require("mongoose");
const { ref } = require("process");

const assignmentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	typeOfAssignment: {
		type: String,
		enum: ['mcq', 'pdf'],
		required: [true, "assignment type is required"]
	},

	question: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Question",
		required: true
	}],

	pdfUrl: {
		type: String,
	},

	module: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Module",
		required: true
	},

	submissions: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Submission",
	}]
}, { timestamps: true });

assignmentSchema.pre("save", function (next) {
	if (this.typeOfAssignment === "mcq" && !this.question) {
		return next(new Error("MCQ assignment must have a question reference"));
	}
	if (this.typeOfAssignment === "pdf" && !this.pdfUrl) {
		return next(new Error("PDF assignment must have a pdfUrl"));
	}
	next();
});

module.exports = mongoose.model('Assignment', assignmentSchema);