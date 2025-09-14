const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  uploadSubheadingImage,
} = require("../controller/blogController");

const adminAuth = require("../middleware/adminAuth");
const upload = require("../middleware/blogupload");

const router = express.Router();

// Public
router.get("/", getAllBlogs);

router.get("/:id", getBlogById);

// Admin-only
router.post(
  "/",
  adminAuth,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
  ]),
  createBlog
);

router.put(
  "/:id",
  adminAuth,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
  ]),
  updateBlog
);

router.delete("/:id", adminAuth, deleteBlog);

module.exports = router;



