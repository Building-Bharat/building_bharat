const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true
	},
	description: {
		type: String,
		require: true,
		minLength: [30, "mininum 30 char is required"]
	},
	courseContain: {
		type: [string],
		require: true
	},
	instructorName: {
		type: String,
		require: true,
	},
	instructorDescription: {
		type: String,
		require: true
	},
	instructorPicture: {
		type: String,
		require: true
	},
	courseThumbnail: {
		type: String,
		require: true
	},
	ratings: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				required: true,
			},
			rating: {
				type: Number,
				min: 1,
				max: 5,
				required: true
			},
			review: {
				type: String,
				maxLength: 500,
			}
		}
	],
	averageRating: {
		type: Number,
		default: 0
	},
	totalRatings: {
		type: Number,
		default: 0
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Admin',
		required: true
	},

	module: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Module',
		required: true
	}],

	faq: [{
		type: mongoose.Schema.type.ObjectId,
		ref: 'FAQ',
		required: true
	}]
}, { timestamps: true });

courseSchema.methods.calculateRatings = function () {
	if (this.ratings.length === 0) {
		this.averageRating = 0;
		this.totalRatings = 0;
		return;
	}

	const total = this.ratings.reduce((acc, r) => acc + r.rating, 0);
	this.totalRatings = this.ratings.length;
	this.averageRating = total / this.totalRatings;
};

courseSchema.pre("save", function (next) {
	this.calculateRatings();
	next();
});

module.exports = mongoose.model("Course", courseSchema);
