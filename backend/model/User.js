// backend/models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  googleId: { type: String },
  otp: { type: String },
  otpExpiry: { type: Date },
});

// Prevent model overwrite issue in development (hot reload)
module.exports = mongoose.models?.User || mongoose.model("User", UserSchema);