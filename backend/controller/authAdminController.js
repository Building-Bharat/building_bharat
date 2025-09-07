const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Admin = require("../model/admin"); // ✅ ensure path is correct
const TokenBlacklist = require('../model/tokenBlacklist')

// temporary OTP store (in prod use Redis/DB)
const otpStore = new Map();

class AdminAuthController {

  // ✅ Register Admin
  static async signUp(req, res) {
    try {
      const { name, email, password, passwordConfirm, adminKey } = req.body;

      // check admin key
      if (adminKey !== process.env.ADMIN_KEY) {
        return res.status(403).json({ message: "Invalid Admin Key" });
      }

      // confirm password
      if (password !== passwordConfirm) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      // check existing
      const existing = await Admin.findOne({ email });
      if (existing) {
        return res.status(400).json({ message: "Admin already exists" });
      }

      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      await Admin.create({
        name,
        email,
        password: hashedPassword,
      });

      res.status(201).json({ message: "Admin registered" });
    } catch (err) {
      res.status(500).json({ message: "Signup failed", error: err.message });
    }
  }

  // ✅ Login
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const admin = await Admin.findOne({ email }).select("+password");
      if (!admin) return res.status(400).json({ message: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { id: admin._id, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.status(200).json({
        token,
        admin: { id: admin._id, name: admin.name, email: admin.email },
      });
    } catch (err) {
      res.status(500).json({ message: "Login failed", error: err.message });
    }
  }

  // ✅ Forgot Password (Requires ADMIN_KEY)
static async forgetPassword(req, res) {
  try {
    const { email, adminKey } = req.body;

    // 1️⃣ Check ADMIN_KEY
    if (adminKey !== process.env.ADMIN_KEY) {
      return res.status(401).json({ message: "Invalid ADMIN_KEY" });
    }

    // 2️⃣ Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    // 3️⃣ Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    otpStore.set(email, { otp, expires: Date.now() + 5 * 60 * 1000 });

    // 4️⃣ Send OTP via email
    await sendEmail(email, "Password Reset OTP", `Your OTP is: ${otp}`);

    res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP", error: err.message });
  }
}


  // ✅ Change Password
  static async changePassword(req, res) {
    try {
      const { email, otp, newPassword, confirmPassword } = req.body;

      if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      // check OTP
      const record = otpStore.get(email);
      if (!record || record.otp !== otp || record.expires < Date.now()) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
      }


      // hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await Admin.findOneAndUpdate({ email }, { password: hashedPassword });

      otpStore.delete(email);

      res.status(200).json({ message: "Password changed successfully" });
    } catch (err) {
      res.status(500).json({ message: "Failed to change password", error: err.message });
    }
  }

  // ✅ Logout (for JWT)
  static async logout(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(400).json({
          success: false,
          message: "No token provided",
        });
      }

      // Decode token to get expiry
      const decoded = jwt.decode(token);
      const expiresAt = new Date(decoded.exp * 1000); // convert seconds → ms

      // Save token in blacklist
      await TokenBlacklist.create({ token, expiresAt });

      return res.status(200).json({
        success: true,
        message: "Logged out successfully. Token blacklisted.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Logout failed",
        error: error.message,
      });
    }
  }

}





// ✅ Utility: Email Sender
async function sendEmail(to, subject, otp) {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or your email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const htmlTemplate = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>${subject}</title>
    </head>
    <body style="margin:0; padding:0; background-color:#f4f4f7; font-family:Arial, sans-serif;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center" style="padding:40px 0;">
            <table width="600" border="0" cellspacing="0" cellpadding="0" style="background:#ffffff; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1); padding:40px; max-width:600px;">
              <tr>
                <td align="center" style="font-size:28px; font-weight:bold; color:#333;">
                  Admin Dashboard
                </td>
              </tr>
              <tr>
                <td align="center" style="padding:20px 0; font-size:18px; color:#555;">
                  Your One-Time Password (OTP) is:
                </td>
              </tr>
              <tr>
                <td align="center" style="padding:20px 0;">
                  <div style="font-size:32px; font-weight:bold; color:#4CAF50; background:#f0fdf4; border:2px dashed #4CAF50; display:inline-block; padding:15px 30px; border-radius:8px;">
                    ${otp}
                  </div>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding:20px 0; font-size:14px; color:#777;">
                  This OTP is valid for the next <strong>10 minutes</strong>.  
                  If you did not request this, please ignore the email.
                </td>
              </tr>
              <tr>
                <td align="center" style="padding-top:30px; font-size:12px; color:#aaa;">
                  &copy; ${new Date().getFullYear()} Building Bharat Admin Dashboard. All rights reserved.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;

  await transporter.sendMail({
    from: `"Admin Dashboard" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: htmlTemplate, // Use HTML instead of plain text
  });
}

module.exports = AdminAuthController;

