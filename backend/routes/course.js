const express = require("express");
const adminAuth = require("../middleware/adminAuth");
const upload = require("../service/awsResource.service");
const router = express.Router();
const courseController = require("../controller/courseController");
const authController = require("../controller/authController");

// for admin routes // 

//course
router.post("/admin/", adminAuth, upload.fields([
	{ name: "courseThumbnail", maxCount: 1 },
	{ name: "instructorPicture", maxCount: 1 }
]), courseController.postNewCourse);
router.patch("admin/:id", adminAuth, upload.fields([
	{ name: "courseThumbnail", maxCount: 1 },
	{ name: "instructorPicture", maxCount: 1 }
]), courseController.updateCourseDetails);


// module
router.post("/admin/course/:id/module", adminAuth, courseController.createCourseModule);
router.patch("/admin/course/:id/module", adminAuth, courseController.updateCourseModule);
router.delete("/admin/module/:id", adminAuth, courseController.deleteCourseModule);

//frequantly ask question
router.post("/admin/course/:id/faq", adminAuth, courseController.createFAQ);
router.patch("admin/course/:id/faq/:id", adminAuth, courseController.updateFAQ);
router.delete("admin/course/:id/faq/:id", adminAuth, courseController.deleteFAQ);


// video 
// router.post("/admin/module/:id/video", adminAuth, courseController);

//assignment
router.post("/admin/module/:id/assignment", adminAuth, courseController.createAssignment);
router.patch("/admin/module/:id/assignment", adminAuth, courseController.updateAssignment);
router.delete("/admin/assignment/:id", adminAuth, courseController.deleteAssignment);

// mcq
router.post("/admin/assignment/:id/question", adminAuth, courseController.createMcqAssignment);
router.patch("/admin/assignment/:id/question/:id", adminAuth, courseController.updateMcqAssignment);
router.delete("/admin/assignment/:id/question/:id", adminAuth, courseController.deleteSingleMcqAssignment);


//for user route
router.get("/:id", courseController.getCourses);
router.get("/all", courseController.getAllCourse);
router.get("/module/:id", courseController.getCourseModule);

router.get("/assignment/:id", authController.protect, courseController.getAllMcqAssignment);
router.post("/assignment/:id/submit", authController.protect, courseController.submitMcqByUser);

router.get("/assignment/:id/pdf", authController.protect, courseController.getPdfAssignment);
router.post("/assignment/:id/pdf/submit", authController.protect, upload.single('file'), courseController.submitAssignmentByUser);

router.post("/:userId/:courseId/rating", authController.protect, courseController.giveRatingToCourse);
router.get("/:courseId/reviews", courseController.getCourseReview)