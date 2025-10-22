import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  location: { type: String, required: true },
  resume: { type: String, required: true },
  user:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
  internship:{ type: mongoose.Schema.Types.ObjectId, ref: "Internship" },

  // Education details
  college: { type: String, required: true },
  degree: { type: String, required: true },
  major: { type: String, required: true },
  startMonth: { type: String, required: true },
  startYear: { type: Number, required: true },
  endMonth: { type: String },
  endYear: { type: Number },
  currentlyStudyingEducation: { type: Boolean, default: false }

}, { timestamps: true });

export default mongoose.models.Application || mongoose.model("Application", ApplicationSchema);
