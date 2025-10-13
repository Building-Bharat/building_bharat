const express = require("express");
const adminAuth = require("../middleware/adminAuth");
const upload = require("../service/awsResource.service");
const router = express.Router();
const courseController = require("../controller/courseController");
const authController = require("../controller/authController");

// for admin routes // 

//course(tested and connected to frontend)
router.post("/admin/", adminAuth, upload.fields([
	{ name: "courseThumbnail", maxCount: 1 },
	{ name: "instructorPicture", maxCount: 1 }
]), courseController.postNewCourse);
router.patch("/admin/:id", adminAuth, upload.fields([
	{ name: "courseThumbnail", maxCount: 1 },
	{ name: "instructorPicture", maxCount: 1 }
]), courseController.updateCourseDetails);


// module(tested)
router.post("/admin/:id/module", adminAuth, courseController.createCourseModule);
router.patch("/admin/module/:id", adminAuth, courseController.updateCourseModule);
router.delete("/admin/module/:id", adminAuth, courseController.deleteCourseModule);


// frequantly ask question(tested)
router.post("/admin/:id/faq", adminAuth, courseController.createFAQ);
router.patch("/admin/faq/:id", adminAuth, courseController.updateFAQ);
router.delete("/admin/faq/:id", adminAuth, courseController.deleteFAQ);


// video 
// router.post("/admin/module/:id/video/upload-url", adminAuth, courseController.getVideoUploadUrl);
router.post("/admin/module/:id/video", adminAuth, courseController.createVideo);

//assignment(tested successfully)
router.post("/admin/module/:id/assignment", adminAuth,
	upload.single("assignmentDoc"), courseController.createAssignment);
router.patch("/admin/assignment/:id", adminAuth, upload.single("assignmentDoc"), courseController.updateAssignment);
router.delete("/admin/assignment/:id", adminAuth, courseController.deleteAssignment);


//have to work on this,All Submissions
router.get(
	"/assignment/:id/submissions", adminAuth, courseController.getAllSubmissionsForAssignment
);

//Admin submission(single)
router.get(
	"/assignment/:id/submissions/:submissionId", adminAuth, courseController.getSingleSubmission
);

//Admin mark and review (Admin can give review and marks to a particular submission)
router.post(
    "/submissions/:submissionId/marksandreview",adminAuth, courseController.postAssignementMarkByAdmin
);

//Give marks to submission

// mcq(tested)
router.post("/admin/assignment/:id/question", adminAuth, courseController.createMcqAssignment);
router.patch("/admin/assignment/question/:id", adminAuth, courseController.updateMcqAssignment);
router.delete("/admin/assignment/question/:id", adminAuth, courseController.deleteSingleMcqAssignment);


//for user route
router.get("/:id", courseController.getCourse);
router.get("/", courseController.getAllCourse);
// router.get("/module/:id", courseController.getSingleModule);

//user route(tested)
router.get("/assignment/:id", authController.protect, courseController.getAllMcqAssignment);
router.post("/assignment/:id/submit", authController.protect, courseController.submitMcqByUser);


//assignmentpdf( tested successfully)
 router.get("/assignment/:id/pdf", authController.protect, courseController.getPdfAssignment);
router.post("/:userId/assignment/:assignmentId/pdf/submit", authController.protect, upload.single("submissionDoc"), courseController.submitAssignmentByUser);


//Ratings courses(tested rating,review)
router.post("/:userId/course/:courseId/rating", authController.protect, courseController.giveRatingToCourse);
router.get("/:courseId/reviews", courseController.getCourseReview)

module.exports = router;