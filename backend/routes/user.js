
const userController = require('../controller/userController');
const authController = require('../controller/authController')
const express = require('express');
const router = express.Router();


router.get('/:id', userController.getUserById);

router.put('/:id/createprofile', authController.protect, userController.createUserProfile);

// Get user's purchased courses
router.get('/:userId/purchased-courses', authController.protect, userController.getPurchasedCourses);

module.exports = router;