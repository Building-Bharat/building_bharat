const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controller/blogController");

const adminAuth = require("../middleware/adminAuth"); // checks admin
// multer config
const upload = require('../middleware/resume.middleware');
const router = express.Router();

// Public
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

// Admin-only
router.post("/", adminAuth, upload.single('file'), createBlog);
router.put("/:id", adminAuth, upload.single("file"), updateBlog);
router.delete("/:id", adminAuth, deleteBlog);

module.exports = router;

