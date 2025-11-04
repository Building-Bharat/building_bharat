const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
    minLength: [3, "Coupon code must be at least 3 characters"],
    maxLength: [20, "Coupon code cannot exceed 20 characters"]
  },
  description: {
    type: String,
    required: true,
    maxLength: [200, "Description cannot exceed 200 characters"]
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true,
    default: 'percentage'
  },
  discountValue: {
    type: Number,
    required: true,
    min: [0, "Discount value cannot be negative"],
    validate: {
      validator: function(value) {
        if (this.discountType === 'percentage') {
          return value >= 0 && value <= 100;
        }
        return value >= 0;
      },
      message: "Percentage discount must be between 0 and 100"
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  validFrom: {
    type: Date,
    required: true,
    default: Date.now
  },
  validUntil: {
    type: Date,
    required: true,
    validate: {
      validator: function(value) {
        return value > this.validFrom;
      },
      message: "Valid until date must be after valid from date"
    }
  },
  usageLimit: {
    type: Number,
    default: null, // null means unlimited usage
    min: [0, "Usage limit cannot be negative"]
  },
  usedCount: {
    type: Number,
    default: 0,
    min: [0, "Used count cannot be negative"]
  },
  minimumOrderAmount: {
    type: Number,
    default: 0,
    min: [0, "Minimum order amount cannot be negative"]
  },
  applicableCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }], // Empty array means applicable to all courses
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true
  },
  usedBy: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    usedAt: {
      type: Date,
      default: Date.now
    },
    orderId: {
      type: String,
      required: true
    },
    discountAmount: {
      type: Number,
      required: true
    }
  }]
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for checking if coupon is currently valid
couponSchema.virtual('isCurrentlyValid').get(function() {
  const now = new Date();
  return this.isActive && 
         now >= this.validFrom && 
         now <= this.validUntil &&
         (this.usageLimit === null || this.usedCount < this.usageLimit);
});

// Virtual for remaining uses
couponSchema.virtual('remainingUses').get(function() {
  if (this.usageLimit === null) return 'Unlimited';
  return Math.max(0, this.usageLimit - this.usedCount);
});

// Method to check if user has already used this coupon
couponSchema.methods.hasUserUsed = function(userId) {
  return this.usedBy.some(usage => usage.userId.toString() === userId.toString());
};

// Method to validate coupon for a specific order
couponSchema.methods.validateForOrder = function(userId, courseId, orderAmount) {
  const now = new Date();
  
  // Check if coupon is active
  if (!this.isActive) {
    return { valid: false, message: "Coupon is not active" };
  }
  
  // Check date validity
  if (now < this.validFrom) {
    return { valid: false, message: "Coupon is not yet valid" };
  }
  
  if (now > this.validUntil) {
    return { valid: false, message: "Coupon has expired" };
  }
  
  // Check usage limit
  if (this.usageLimit !== null && this.usedCount >= this.usageLimit) {
    return { valid: false, message: "Coupon usage limit exceeded" };
  }
  
  // Check if user has already used this coupon
  if (this.hasUserUsed(userId)) {
    return { valid: false, message: "You have already used this coupon" };
  }
  
  // Check minimum order amount
  if (orderAmount < this.minimumOrderAmount) {
    return { 
      valid: false, 
      message: `Minimum order amount of ₹${this.minimumOrderAmount} required` 
    };
  }
  
  // Check course applicability
  if (this.applicableCourses.length > 0 && courseId) {
    const isCourseApplicable = this.applicableCourses.some(
      course => course.toString() === courseId.toString()
    );
    if (!isCourseApplicable) {
      return { valid: false, message: "Coupon not applicable for this course" };
    }
  }
  
  return { valid: true, message: "Coupon is valid" };
};

// Method to calculate discount amount
couponSchema.methods.calculateDiscount = function(orderAmount) {
  if (this.discountType === 'percentage') {
    return Math.round((orderAmount * this.discountValue) / 100);
  } else {
    return Math.min(this.discountValue, orderAmount);
  }
};

// Method to apply coupon (increment usage)
couponSchema.methods.applyCoupon = function(userId, orderId, discountAmount) {
  this.usedCount += 1;
  this.usedBy.push({
    userId,
    orderId,
    discountAmount,
    usedAt: new Date()
  });
  return this.save();
};

// Index for better performance
couponSchema.index({ code: 1 });
couponSchema.index({ isActive: 1, validFrom: 1, validUntil: 1 });
couponSchema.index({ createdBy: 1 });

module.exports = mongoose.model("Coupon", couponSchema);
