const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

//auth endpoint

router.post('/signUp/email', authController.emailSignUp);

router.post('/login/email', authController.loginEmail);

router.post('/forget-password', authController.forgotPassword);

router.post('/reset-password/token', authController.resetPassword);

router.patch('/updateMyPassword', authController.protect, authController.updatePassword);


//need to implement
// router.post('/signUp/oAuth', authController.oAuthSignUp);
// router.post('/login/oAuth', authController.loginoAuth);

module.exports = router;