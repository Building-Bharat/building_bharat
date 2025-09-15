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
	duration: {
		type: Number
	},
	moduleId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Module",
		require: true
	}
}, { timestamps: true });

module.exports = mongoose.model('Video', videoShcema);