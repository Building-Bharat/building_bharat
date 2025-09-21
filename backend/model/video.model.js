const mongoose = require("mongoose");

const videoShcema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
	},
	videoURL: {
		type: String,
		require: true,
	},
	resolutions: [
		{
			quality: String,
			url: String
		}
	],
	status: {
		type: String,
		enum: ["processing", "ready"], default: "processing"
	},
	duration: {
		type: Number
	},
	thumbnail: { type: String },

	subtitle: {
		type: String,
		required: true
	},
	moduleId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Module",
		require: true
	}
}, { timestamps: true });

module.exports = mongoose.model('Video', videoShcema);