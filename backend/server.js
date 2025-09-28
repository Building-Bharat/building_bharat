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
const app = express();

//middleware
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],  // adminpanel and frontend at same time cors issue fix
  credentials: true
}));
app.use(express.json());


const PORT = process.env.PORT || 5000;


//mongodb connection
connectDB();

//api middleware
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/internship', internshipRoutes);
app.use('/api/v1/course', courseRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/v1/admin', adminAuthRoutes);
app.use("/api/blogs", blogRoutes);



app.listen(PORT, () => {
  console.log(`🔥 Server is running on http://localhost:${PORT}`);
});