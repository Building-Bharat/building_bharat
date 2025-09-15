const jwt = require("jsonwebtoken");
const Admin = require("../model/admin"); // ensure correct path
const TokenBlacklist = require('../model/tokenBlacklist');

// Middleware for admin authentication
const adminAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }

     // Check blacklist
    const blacklisted = await TokenBlacklist.findOne({ token });
    if (blacklisted) {
      return res.status(401).json({ success: false, message: "Token is blacklisted, please login again" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch admin
    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      return res.status(401).json({ success: false, message: "Admin not found" });
    }

    // If you keep isAdmin flag in Admin schema
    if (admin.isAdmin === false) {
      return res.status(403).json({ success: false, message: "Admins only!" });
    }

    req.user = admin; // attach admin to req
    next();
  } catch (error) {
    console.error("Admin Auth Error:", error.message);
    return res.status(401).json({ success: false, message: "Not authorized, token failed" });
  }
};

module.exports = adminAuth;

