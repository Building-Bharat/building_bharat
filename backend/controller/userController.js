const User = require('../model/user.model');
const express = require('express')
const { extractFileUrlOrKey } = require("../utils/fileHelper");
const { json } = require("express");

exports.getUserById = async (req, res) => {
	const { id } = req.params;

	try {
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.status(200).json({ data: user });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal server error' });
	}
};

exports.createUserProfile = async (req, res) => {
  const { id } = req.params;

  try {

      const canUpdate = [
			"collegeName",
			"collegePassout",
			"description",
		];

		const requiredUpdate = {};


    // Extract the uploaded profile photo (if applicable)
    const profilePhoto = extractFileUrlOrKey(req, "profilePhoto");

	if (profilePhoto) {
				requiredUpdate["profilePhoto"] = profilePhoto; // new one
			}

    // Validate required fields
    if (!collegeName || !collegePassout || !description) {
      return res.status(400).json({
        status: "fail",
        message: "All fields (collegeName, collegePassout, description) are required.",
      });
    }

    // Only add profilePhoto if it exists (to avoid overwriting existing one with null)
    if (profilePhoto) {
      updateData.profilePhoto = profilePhoto;
    }

    // Update the user document
    const updatedUserProfile = await User.findByIdAndUpdate({_id:id}, canUpdate, {
      new: true,          // return updated document
      runValidators: true // validate according to schema
    });

    // Handle case if user not found
    if (!updatedUserProfile) {
      return res.status(404).json({
        status: "fail",
        message: "User not found.",
      });
    }

    // Success response
    return res.status(200).json({
      status: "success",
      data: updatedUserProfile,
    });

  } catch (err) {
    // Error response
    return res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
