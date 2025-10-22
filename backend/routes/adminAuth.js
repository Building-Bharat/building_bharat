const express = require("express");
const router = express.Router();
const AdminAuthController = require("../controller/authAdminController");
const AdminAuth = require('../middleware/adminAuth')

// Admin Registration
// Checks `admin-key` in request before allowing signup.
// After signup, send OTP to admin email.
router.post("/register", AdminAuthController.signUp);

//  Admin Login
router.post("/login", AdminAuthController.login);

//  Forgot Password (send OTP / reset link)
router.post("/forgetPassword", AdminAuthController.forgetPassword);



//  Change Password (after OTP verification / logged in)
router.post("/changePassword", AdminAuthController.changePassword);


//logout route
router.post("/logout", AdminAuth, AdminAuthController.logout);

module.exports = router;

