const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Blog name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Blog description is required"],
    },
    thumbnail: {
      type: String, // path or URL
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "lastUpdateDate" } }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
