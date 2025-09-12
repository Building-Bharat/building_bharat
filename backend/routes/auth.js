const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

//auth endpoint

router.post('/signup/email', authController.emailSignUp);

router.post('/login/email', authController.loginEmail);

router.post('/forget-password', authController.forgotPassword);

router.post('/reset-password/:token', authController.resetPassword);

router.post('/verify-otp', authController.verifyOTP);

// Public Google auth endpoint
router.post('/google', authController.googleAuth);

// Extra OTP flows (kept compatible with original schema)
router.post('/send-otp', authController.sendOtpForReset);
router.post('/verify-otp-for-reset', authController.verifyOtpForReset);
router.post('/reset-password', authController.resetPasswordSimple);
router.post('/send-login-otp', authController.sendLoginOtp);
router.post('/verify-login-otp', authController.verifyLoginOtp);

// Protect only specific routes explicitly to avoid accidental 401s on public endpoints
router.patch('/updateMyPassword', authController.protect, authController.updatePassword);


//need to implement
// router.post('/signUp/oAuth', authController.oAuthSignUp);
// router.post('/login/oAuth', authController.loginoAuth);

module.exports = router;