const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Database connection
const connectDB = require('./service/mongodb.service');

// Route files
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const courseRoutes = require('./routes/course');
const internshipRoutes = require('./routes/internship');
const contactRoutes = require('./routes/contact');
const adminAuthRoutes = require('./routes/adminAuth');
const blogRoutes = require('./routes/blog');
const orderRoutes = require('./routes/orders');
const transactionRoutes = require('./routes/transactions');

const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB
connectDB();

// API routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/internship', internshipRoutes);
app.use('/api/v1/course', courseRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/v1/admin', adminAuthRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/transactions', transactionRoutes);

//  Exports the app 
module.exports = app;
