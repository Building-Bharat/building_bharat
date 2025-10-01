const mongoose = require('mongoose');
const internshipSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	frim: {
      type: String,
      required: [true, "Frim is required"],
      trim: true,
    },
	description: {
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
	internshipType: {
		type: String,
		enum: ["Remote", "Onsite", "Hybrid"],
		required: true,
		default: "Remote",
	},

	location: {
		type: String,
		trim: true, 
		required: function () {
			// Location required only if internship is not Remote
			return this.internshipType !== "Remote";
		},
	},
	image:{
		type:String,
		required:true
	},

	responsibilities: {
		type: [String],
		validate: {
			validator: function (arr) {
			  return arr.length > 0; // must have at least one responsibility
			},
			message: "At least one responsibility is required.",
		},
	},
	applyBy: {
		type: Date,
		required: true
	},
	applications: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Application',
		required: true
	}]
});

module.exports = mongoose.model('Internship', internshipSchema);