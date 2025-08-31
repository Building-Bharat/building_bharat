const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./service/mongodb.service');
//Route file
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const courseRoutes = require('./routes/course');
const internshipRoutes = require('./routes/internship');
const contactRoutes = require('./routes/contact')

const app = express();

//middleware
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5000;


//mongodb connection
connectDB();

//api middleware
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/auth', authRoutes);
// app.use('api/v1/course', courseRoutes);
// app.use('api/v1/internship', internshipRoutes);
app.use('/api/contact', contactRoutes);

app.listen(PORT, () => {
  console.log(`🔥 Server is running on http://localhost:${PORT}`);
});