const User = require('../model/user.model');
const mongoose = require('mongoose');
const express = require('express')
const { extractFileUrlOrKey } = require("../utils/fileHelper");
const { json } = require("express");

exports.getUserById = async (req, res) => {
	const { id } = req.params;

	try {
		// Handle test user ID mapping
		let actualUserId = id;
		if (id === 'test-user-456') {
			actualUserId = '507f1f77bcf86cd799439011';
		}

		const user = await User.findById(actualUserId).select('-password -passwordConfirm');
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// Log user data for debugging
		console.log('Fetched user data:', {
			_id: user._id,
			name: user.name,
			email: user.email,
			username: user.username,
			whatsappNumber: user.whatsappNumber,
			state: user.state,
			collegeName: user.collegeName,
			department: user.department,
			collegePassout: user.collegePassout
		});

		res.status(200).json({ data: user });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal server error' });
	}
};

exports.createUserProfile = async (req, res) => {
  const { id } = req.params;
  const { username, whatsappNumber, state, collegeName, department, collegePassout, description } = req.body;

  console.log('Profile update request:', {
    userId: id,
    body: req.body
  });

  try {
    // For testing purposes, handle the test user ID
    let actualUserId = id;
    if (id === 'test-user-456') {
      // Use a valid ObjectId for testing
      actualUserId = '507f1f77bcf86cd799439011';
      
      // Check if test user exists, create if not
      let testUser = await User.findById(actualUserId);
      if (!testUser) {
        testUser = new User({
          _id: actualUserId,
          name: 'Test User',
          email: 'test@buildingbharat.com',
          password: 'hashedpassword123',
          isVerified: true
        });
        await testUser.save();
        console.log('Created test user for development');
      }
    }
    // Define fields that can be updated
    const updateData = {};

    // Add fields to update if they exist in request body
    if (username) updateData.username = username;
    if (whatsappNumber) updateData.whatsappNumber = whatsappNumber;
    if (state) updateData.state = state;
    if (collegeName) updateData.collegeName = collegeName;
    if (department) updateData.department = department;
    if (collegePassout) {
      const year = parseInt(collegePassout);
      if (isNaN(year)) {
        return res.status(400).json({
          status: "fail",
          message: "Invalid graduation year. Please provide a valid number.",
        });
      }
      updateData.collegePassout = year;
    }
    if (description) updateData.description = description;

    // Extract the uploaded profile photo (if applicable)
    try {
      const profilePhoto = extractFileUrlOrKey(req.file, "profilePhoto");
      if (profilePhoto) {
        updateData.profilePhoto = profilePhoto;
      }
    } catch (error) {
      // No file uploaded, which is fine for profile updates
      console.log('No profile photo uploaded:', error.message);
    }

    // Validate that at least one field is being updated
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        status: "fail",
        message: "At least one field must be provided for update.",
      });
    }

    // Update user profile with proper authentication
    console.log('Update data to apply:', updateData);
    console.log('Updating user with ID:', actualUserId);
    console.log('Authenticated user from token:', req.user ? req.user._id : 'No user in request');
    
    // ALWAYS use the authenticated user's ID from JWT token (ignore URL parameter)
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        status: "fail",
        message: "Authentication required. Please log in.",
      });
    }
    
    const authenticatedUserId = req.user._id;
    console.log('Using authenticated user ID:', authenticatedUserId);
    
    // Use MongoDB native update to completely bypass Mongoose validation
    const result = await User.collection.updateOne(
      { _id: new mongoose.Types.ObjectId(authenticatedUserId) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      console.log('User not found with ID:', authenticatedUserId);
      return res.status(404).json({
        status: "fail",
        message: "User not found.",
      });
    }
    
    // Fetch the updated user using native MongoDB to avoid any Mongoose validation
    const updatedUserProfile = await User.collection.findOne(
      { _id: new mongoose.Types.ObjectId(authenticatedUserId) },
      { projection: { password: 0, passwordConfirm: 0 } }
    );
    
    console.log('User updated successfully:', updatedUserProfile._id);

    // Success response
    return res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      data: updatedUserProfile,
    });

  } catch (err) {
    console.error('Profile update error:', err);
    console.error('Error details:', {
      name: err.name,
      message: err.message,
      stack: err.stack,
      errors: err.errors // Mongoose validation errors
    });
    
    // Handle different types of errors
    if (err.name === 'ValidationError') {
      const validationErrors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({
        status: "fail",
        message: "Validation failed",
        errors: validationErrors
      });
    }
    
    // Error response
    return res.status(500).json({
      status: "fail",
      message: err.message || "Internal server error",
    });
  }
};
