const internshipController = require('../controller/internshipController.js');
const express = require('express');
const router = express.Router();
const authController = require('../controller/authController.js');
const adminAuth = require('../middleware/adminAuth.js');
// const upload = require('../middleware/resume.middleware');
// const internshipValidatationRules = require('../utils/internshipValidator.js');



//admin routes 
router.post('/admin/', authController.protect, authController.restrictTo('admin'), internshipController.createInternship);


router.delete('/admin/:id', authController.protect, authController.restrictTo('admin'), internshipController.deleteInternship);

router.get('/admin/all', internshipController.adminGetAllInternships);

router.get('/admin/:id', authController.protect, authController.restrictTo('admin'), internshipController.getApplicantsForInternship);

//user routes
router.get('/', internshipController.getAllInternships);
// router.post('/apply/:id', authController.protect, upload.single('resume'), internshipController.applyInternshipById);
router.get('/applied', authController.protect, internshipController.getAllAppliedInternships);

module.exports = router;

