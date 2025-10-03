const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
   
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // don’t send password in queries by default
    },
  },
  { timestamps: true }
);

// Compare password method
adminSchema.methods.comparePassword = async function (candidatePassword, hashedPassword) {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};

adminSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
	if (this.passwordChangeAt) {
		const changedTimestamp = parseInt(this.passwordChangeAt.getTime() / 1000, 10);
		return changedTimestamp > JWTTimestamp;
	}

	// False for users who have no passwordChangeAt
	return false;
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
