const mongoose = require("mongoose");

const subHeadingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: null }, // image will be added later
});

const blogSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, default: null },
  subHeadings: [subHeadingSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Blog", blogSchema);


