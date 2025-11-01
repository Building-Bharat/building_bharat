const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");
require('dotenv').config();
const connectDB = require('./service/mongodb.service');
//Route file
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const courseRoutes = require('./routes/course');
const internshipRoutes = require('./routes/internship');
const contactRoutes = require('./routes/contact')
const adminAuthRoutes = require('./routes/adminAuth')
const blogRoutes = require('./routes/blog')
const orderRoutes = require('./routes/orders')
const transactionRoutes = require('./routes/transactions')
const couponRoutes = require('./routes/coupon')
const webhookRoutes = require('./routes/webhooks')
const app = express();

//middleware
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],  // adminpanel and frontend at same time cors issue fix
  credentials: true
}));

app.use(express.urlencoded({extended: true}))
app.use(express.json());


const PORT = process.env.PORT || 5000;


//mongodb connection
connectDB();

// Webhook route MUST come before express.json() to get raw body
app.use('/api/v1/webhooks', webhookRoutes);

app.use(express.json());

//api middleware
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/internship', internshipRoutes);
app.use('/api/v1/course', courseRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/v1/admin', adminAuthRoutes);
app.use("/api/blogs", blogRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/transactions', transactionRoutes);
app.use('/api/coupon', couponRoutes);

// Test route for coupon initialization
app.post('/api/test-coupon-init', async (req, res) => {
  try {
    const Coupon = require('./model/coupon.model');
    
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
        createdBy: new require('mongoose').Types.ObjectId('507f1f77bcf86cd799439011')
      });

      await diwaliCoupon.save();

      res.json({
        success: true,
        message: 'DIWALI2025 coupon created successfully!',
        coupon: {
          code: diwaliCoupon.code,
          description: diwaliCoupon.description,
          discountValue: diwaliCoupon.discountValue,
          validUntil: diwaliCoupon.validUntil.toLocaleString(),
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
          validUntil: existingCoupon.validUntil.toLocaleString(),
          usageLimit: existingCoupon.usageLimit,
          usedCount: existingCoupon.usedCount
        }
      });
    }
  } catch (error) {
    console.error('Error initializing coupon:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating coupon',
      error: error.message
    });
  }
});



app.listen(PORT, () => {
  console.log(`🔥 Server is running on http://localhost:${PORT}`);
});