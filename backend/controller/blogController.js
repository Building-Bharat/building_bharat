const Blog = require('../model/blog.model');

// Create Blog
const createBlog = async (req, res) => {
  try {
    const { name, description, subHeadings } = req.body;
    const createdBy = req.user?._id;

    if (!name || !description) {
      return res.status(400).json({ success: false, message: "Name and description are required" });
    }

    // ✅ Handle thumbnail
    const thumbnail = req.files?.thumbnail?.[0]?.path || null;

    // ✅ Parse subHeadings safely
    let parsedSubHeadings = [];
    if (subHeadings) {
      try {
        parsedSubHeadings = JSON.parse(subHeadings);
      } catch (err) {
        return res.status(400).json({ success: false, message: "Invalid subHeadings JSON" });
      }
    }

    // ✅ Attach subheading images if uploaded
    const subHeadingImages = req.files?.subHeadingImages || [];
    parsedSubHeadings = parsedSubHeadings.map((sub, i) => ({
      title: sub.title || "",
      description: sub.description || "", // 👈 must match schema
      image: subHeadingImages[i] ? subHeadingImages[i].path : null,
    }));

    // ✅ Create blog
    const blog = await Blog.create({
      name,
      description,
      thumbnail,
      createdBy,
      subHeadings: parsedSubHeadings,
    });

    res.status(201).json({ success: true, blog });
  } catch (error) {
    console.error("❌ Blog creation error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



//uploadimagesubheading seperately

const uploadSubheadingImage = async (req, res) => {
  try {
    const { blogId, subHeadingId } = req.params;
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Find the subheading
    const subHeading = blog.subHeadings.id(subHeadingId);
    if (!subHeading) return res.status(404).json({ message: "Subheading not found" });

    // Update image path
    subHeading.image = req.file.path;
    await blog.save();

    res.status(200).json({ success: true, subHeading });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get All Blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("createdBy", "name email");
    res.status(200).json(blogs);  // 👈 send array directly
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);   // 👈 send the blog directly
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Update Blog
const updateBlog = async (req, res) => {
  try {
    let { name, description, subHeadings } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    // ✅ Parse subHeadings if sent as string (multipart/form-data)
    if (subHeadings && typeof subHeadings === "string") {
      try {
        subHeadings = JSON.parse(subHeadings);
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: "Invalid JSON format for subHeadings",
        });
      }
    }

    // ✅ Handle thumbnail update
    if (req.files && req.files["thumbnail"]) {
      blog.thumbnail = req.files["thumbnail"][0].path;
    }

    // ✅ Replace subheading images if new ones are uploaded
    if (subHeadings && Array.isArray(subHeadings)) {
      subHeadings = subHeadings.map((sh, idx) => {
        if (req.files["subHeadingImages"] && req.files["subHeadingImages"][idx]) {
          return {
            ...sh,
            image: req.files["subHeadingImages"][idx].path,
          };
        }
        return sh;
      });
      blog.subHeadings = subHeadings;
    }

    // ✅ Update text fields
    blog.name = name || blog.name;
    blog.description = description || blog.description;

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
  uploadSubheadingImage,
};


