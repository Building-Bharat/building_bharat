const Coupon = require('../model/coupon.model');
const Course = require('../model/course.model');
const catchAsync = require('../utils/catchAsync');

// Validate coupon code
exports.validateCoupon = catchAsync(async (req, res) => {
  const { couponCode, courseId, originalPrice } = req.body;

  if (!couponCode) {
    return res.status(400).json({
      valid: false,
      message: "Coupon code is required"
    });
  }

  // Find coupon by code
  const coupon = await Coupon.findOne({ 
    code: couponCode.toUpperCase() 
  }).populate('applicableCourses');

  if (!coupon) {
    return res.status(404).json({
      valid: false,
      message: "Invalid coupon code"
    });
  }

  // Get userId from request (if authenticated) or use a temporary ID for validation
  const userId = req.user?.id || 'temp-validation';
  const orderAmount = originalPrice || 6999;

  // Validate coupon for this order
  const validation = coupon.validateForOrder(userId, courseId, orderAmount);

  if (!validation.valid) {
    return res.status(400).json({
      valid: false,
      message: validation.message
    });
  }

  // Calculate discount
  const discountAmount = coupon.calculateDiscount(orderAmount);
  const finalAmount = orderAmount - discountAmount;

  res.json({
    valid: true,
    message: "Coupon is valid",
    coupon: {
      code: coupon.code,
      description: coupon.description,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue
    },
    originalAmount: orderAmount,
    discountAmount,
    finalAmount,
    discountValue: coupon.discountValue
  });
});

// Apply coupon to order (called during checkout)
exports.applyCoupon = catchAsync(async (req, res) => {
  const { couponCode, userId, orderId, courseId, originalPrice } = req.body;

  if (!couponCode || !userId || !orderId) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields"
    });
  }

  // Find coupon
  const coupon = await Coupon.findOne({ 
    code: couponCode.toUpperCase() 
  });

  if (!coupon) {
    return res.status(404).json({
      success: false,
      message: "Invalid coupon code"
    });
  }

  const orderAmount = originalPrice || 6999;

  // Validate coupon
  const validation = coupon.validateForOrder(userId, courseId, orderAmount);

  if (!validation.valid) {
    return res.status(400).json({
      success: false,
      message: validation.message
    });
  }

  // Calculate discount
  const discountAmount = coupon.calculateDiscount(orderAmount);

  // Apply coupon (increment usage count)
  await coupon.applyCoupon(userId, orderId, discountAmount);

  res.json({
    success: true,
    message: "Coupon applied successfully",
    discountAmount,
    finalAmount: orderAmount - discountAmount
  });
});

// Admin: Create new coupon
exports.createCoupon = catchAsync(async (req, res) => {
  const {
    code,
    description,
    discountType,
    discountValue,
    validFrom,
    validUntil,
    usageLimit,
    minimumOrderAmount,
    applicableCourses
  } = req.body;

  // Check if coupon code already exists
  const existingCoupon = await Coupon.findOne({ 
    code: code.toUpperCase() 
  });

  if (existingCoupon) {
    return res.status(400).json({
      success: false,
      message: "Coupon code already exists"
    });
  }

  const coupon = new Coupon({
    code: code.toUpperCase(),
    description,
    discountType,
    discountValue,
    validFrom: new Date(validFrom),
    validUntil: new Date(validUntil),
    usageLimit: usageLimit || null,
    minimumOrderAmount: minimumOrderAmount || 0,
    applicableCourses: applicableCourses || [],
    createdBy: req.user.id
  });

  await coupon.save();

  res.status(201).json({
    success: true,
    message: "Coupon created successfully",
    coupon
  });
});

// Admin: Get all coupons
exports.getAllCoupons = catchAsync(async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;
  
  let filter = {};
  if (status === 'active') {
    const now = new Date();
    filter = {
      isActive: true,
      validFrom: { $lte: now },
      validUntil: { $gte: now }
    };
  } else if (status === 'expired') {
    filter = {
      validUntil: { $lt: new Date() }
    };
  } else if (status === 'inactive') {
    filter = { isActive: false };
  }

  const coupons = await Coupon.find(filter)
    .populate('createdBy', 'name email')
    .populate('applicableCourses', 'name')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Coupon.countDocuments(filter);

  res.json({
    success: true,
    coupons,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    total
  });
});

// Admin: Get coupon by ID
exports.getCouponById = catchAsync(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id)
    .populate('createdBy', 'name email')
    .populate('applicableCourses', 'name')
    .populate('usedBy.userId', 'name email');

  if (!coupon) {
    return res.status(404).json({
      success: false,
      message: "Coupon not found"
    });
  }

  res.json({
    success: true,
    coupon
  });
});

// Admin: Update coupon
exports.updateCoupon = catchAsync(async (req, res) => {
  const {
    description,
    discountType,
    discountValue,
    validFrom,
    validUntil,
    usageLimit,
    minimumOrderAmount,
    applicableCourses,
    isActive
  } = req.body;

  const coupon = await Coupon.findById(req.params.id);

  if (!coupon) {
    return res.status(404).json({
      success: false,
      message: "Coupon not found"
    });
  }

  // Update fields
  if (description !== undefined) coupon.description = description;
  if (discountType !== undefined) coupon.discountType = discountType;
  if (discountValue !== undefined) coupon.discountValue = discountValue;
  if (validFrom !== undefined) coupon.validFrom = new Date(validFrom);
  if (validUntil !== undefined) coupon.validUntil = new Date(validUntil);
  if (usageLimit !== undefined) coupon.usageLimit = usageLimit || null;
  if (minimumOrderAmount !== undefined) coupon.minimumOrderAmount = minimumOrderAmount;
  if (applicableCourses !== undefined) coupon.applicableCourses = applicableCourses;
  if (isActive !== undefined) coupon.isActive = isActive;

  await coupon.save();

  res.json({
    success: true,
    message: "Coupon updated successfully",
    coupon
  });
});

// Admin: Delete coupon
exports.deleteCoupon = catchAsync(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);

  if (!coupon) {
    return res.status(404).json({
      success: false,
      message: "Coupon not found"
    });
  }

  // Check if coupon has been used
  if (coupon.usedCount > 0) {
    return res.status(400).json({
      success: false,
      message: "Cannot delete coupon that has been used. You can deactivate it instead."
    });
  }

  await Coupon.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: "Coupon deleted successfully"
  });
});

// Admin: Get coupon usage statistics
exports.getCouponStats = catchAsync(async (req, res) => {
  const stats = await Coupon.aggregate([
    {
      $group: {
        _id: null,
        totalCoupons: { $sum: 1 },
        activeCoupons: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ['$isActive', true] },
                  { $lte: ['$validFrom', new Date()] },
                  { $gte: ['$validUntil', new Date()] }
                ]
              },
              1,
              0
            ]
          }
        },
        totalUsage: { $sum: '$usedCount' },
        totalDiscountGiven: {
          $sum: {
            $reduce: {
              input: '$usedBy',
              initialValue: 0,
              in: { $add: ['$$value', '$$this.discountAmount'] }
            }
          }
        }
      }
    }
  ]);

  const result = stats[0] || {
    totalCoupons: 0,
    activeCoupons: 0,
    totalUsage: 0,
    totalDiscountGiven: 0
  };

  res.json({
    success: true,
    stats: result
  });
});

// Initialize default coupons (for testing)
exports.initializeDefaultCoupons = catchAsync(async (req, res) => {
  // Check if Diwali2025 coupon exists
  const existingCoupon = await Coupon.findOne({ code: 'DIWALI2025' });
  
  if (!existingCoupon) {
    // Create Diwali2025 coupon valid till 7 PM today
    const today = new Date();
    const validUntil = new Date(today);
    validUntil.setHours(19, 0, 0, 0); // 7 PM today

    const diwaliCoupon = new Coupon({
      code: 'DIWALI2025',
      description: 'Special Diwali discount - 20% off on all courses',
      discountType: 'percentage',
      discountValue: 20,
      validFrom: new Date(),
      validUntil: validUntil,
      usageLimit: 100,
      minimumOrderAmount: 0,
      applicableCourses: [],
      createdBy: new require('mongoose').Types.ObjectId('507f1f77bcf86cd799439011') // Default admin ID
    });

    await diwaliCoupon.save();

    res.json({
      success: true,
      message: 'Default coupons initialized successfully!',
      coupon: {
        code: diwaliCoupon.code,
        description: diwaliCoupon.description,
        discountValue: diwaliCoupon.discountValue,
        validUntil: diwaliCoupon.validUntil,
        usageLimit: diwaliCoupon.usageLimit
      }
    });
  } else {
    res.json({
      success: true,
      message: 'DIWALI2025 coupon already exists',
      coupon: {
        code: existingCoupon.code,
        description: existingCoupon.description,
        discountValue: existingCoupon.discountValue,
        validUntil: existingCoupon.validUntil,
        usageLimit: existingCoupon.usageLimit,
        usedCount: existingCoupon.usedCount
      }
    });
  }
});
