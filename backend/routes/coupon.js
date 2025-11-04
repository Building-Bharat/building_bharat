const express = require('express');
const router = express.Router();
const couponController = require('../controller/couponController');
const adminAuth = require('../middleware/adminAuth');

// Public routes (for users)
router.post('/validate', couponController.validateCoupon);
router.post('/apply', couponController.applyCoupon);

// Test endpoint
router.get('/test', (req, res) => {
  res.json({ success: true, message: 'Coupon routes are working!' });
});

// Simple validate endpoint for testing
router.post('/validate-simple', async (req, res) => {
  try {
    console.log('🔍 Validate request received:', req.body);
    
    const { couponCode, originalPrice = 6999 } = req.body;
    
    if (!couponCode) {
      return res.status(400).json({
        valid: false,
        message: "Coupon code is required"
      });
    }

    // Simple hardcoded validation for DIWALI2025
    if (couponCode.toUpperCase() === 'DIWALI2025') {
      const discountValue = 20;
      const discountAmount = Math.round((originalPrice * discountValue) / 100);
      const finalAmount = originalPrice - discountAmount;
      
      console.log('✅ Coupon validated successfully');
      
      return res.json({
        valid: true,
        message: "Coupon is valid",
        coupon: {
          code: "DIWALI2025",
          description: "Special Diwali discount - 20% off",
          discountType: "percentage",
          discountValue: 20
        },
        originalAmount: originalPrice,
        discountAmount,
        finalAmount,
        discountValue: 20
      });
    } else {
      console.log('❌ Invalid coupon code:', couponCode);
      return res.status(400).json({
        valid: false,
        message: "Invalid or expired coupon code"
      });
    }
  } catch (error) {
    console.error('❌ Validate error:', error);
    return res.status(500).json({
      valid: false,
      message: "Server error: " + error.message
    });
  }
});

// Initialize default coupons (for testing) - Public endpoint for setup
router.post('/initialize-default', (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Initialize endpoint is accessible!',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error in initialize endpoint',
      error: error.message
    });
  }
});

// Full initialize function
router.post('/initialize-full', couponController.initializeDefaultCoupons);

// Admin routes (protected)
router.use(adminAuth); // All routes below require admin authentication

router.post('/create', couponController.createCoupon);
router.get('/list', couponController.getAllCoupons);
router.get('/stats', couponController.getCouponStats);
router.get('/:id', couponController.getCouponById);
router.put('/:id', couponController.updateCoupon);
router.delete('/:id', couponController.deleteCoupon);

module.exports = router;
