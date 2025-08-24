const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

//auth endpoint

router.post('/signup/email', authController.emailSignUp);

router.post('/login/email', authController.loginEmail);

router.post('/forget-password', authController.forgotPassword);

router.post('/reset-password/:token', authController.resetPassword);

router.post('/verify-otp', authController.verifyOTP);

router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);


//need to implement
// router.post('/signUp/oAuth', authController.oAuthSignUp);
// router.post('/login/oAuth', authController.loginoAuth);

module.exports = router;