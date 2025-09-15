const Blog = require('../model/blog.model');

// Create Blog
const createBlog = async (req, res) => {
  try {
    const { name, description } = req.body;
    const createdBy = req.user._id; // from middleware

    const thumbnail = extractFileUrlOrKey(req);

    if (!thumbnail) {
      throw new Error("thumbnail not found");
    }

    const blog = await Blog.create({ name, description, thumbnail, createdBy });

    res.status(201).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("createdBy", "name email");
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Blog By ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("createdBy", "name email");
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Blog
const updateBlog = async (req, res) => {
  try {
    const { name, description } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    blog.name = name || blog.name;
    blog.description = description || blog.description;

    if (req.file) {
      blog.thumbnail = extractFileUrlOrKey(req);
    }

    await blog.save();

    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Blog
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    await blog.deleteOne();

    res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};

