const mongoose = require('mongoose');
const Coupon = require('../model/coupon.model');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/buildingbharat', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const initializeCoupons = async () => {
  try {
    await connectDB();

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
        createdBy: new mongoose.Types.ObjectId('507f1f77bcf86cd799439011') // Default admin ID
      });

      await diwaliCoupon.save();
      console.log('✅ Diwali2025 coupon created successfully!');
      console.log(`Valid until: ${validUntil.toLocaleString()}`);
    } else {
      console.log('✅ Diwali2025 coupon already exists');
      console.log(`Valid until: ${existingCoupon.validUntil.toLocaleString()}`);
    }

    // Create a few more sample coupons for testing
    const sampleCoupons = [
      {
        code: 'WELCOME10',
        description: 'Welcome discount for new users - 10% off',
        discountType: 'percentage',
        discountValue: 10,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        usageLimit: 50,
        minimumOrderAmount: 1000,
        applicableCourses: [],
        createdBy: new mongoose.Types.ObjectId('507f1f77bcf86cd799439011')
      },
      {
        code: 'SAVE500',
        description: 'Fixed discount - Save ₹500 on any course',
        discountType: 'fixed',
        discountValue: 500,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
        usageLimit: 20,
        minimumOrderAmount: 2000,
        applicableCourses: [],
        createdBy: new mongoose.Types.ObjectId('507f1f77bcf86cd799439011')
      }
    ];

    for (const couponData of sampleCoupons) {
      const existing = await Coupon.findOne({ code: couponData.code });
      if (!existing) {
        const coupon = new Coupon(couponData);
        await coupon.save();
        console.log(`✅ ${couponData.code} coupon created successfully!`);
      } else {
        console.log(`✅ ${couponData.code} coupon already exists`);
      }
    }

    console.log('\n🎉 All coupons initialized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing coupons:', error);
    process.exit(1);
  }
};

initializeCoupons();
