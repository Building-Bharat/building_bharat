const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	assignment: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment", required: true },
	typeOfAssignment: { type: String, enum: ["mcq", "pdf"], required: true },

	answers: [
		{
			question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
			answer: Number
		}
	],
	score: { type: Number, default: 0 },


	pdfAnswerUrl: { type: String },
	submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Submission", submissionSchema);
