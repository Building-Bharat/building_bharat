const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controller/blogController");

const adminAuth = require("../middleware/adminAuth"); // checks admin
const upload = require("../middleware/blogupload");       // multer config

const router = express.Router();

// Public
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

// Admin-only
router.post("/", adminAuth, upload.single("thumbnail"), createBlog);
router.put("/:id", adminAuth, upload.single("thumbnail"), updateBlog);
router.delete("/:id", adminAuth, deleteBlog);

module.exports = router;

