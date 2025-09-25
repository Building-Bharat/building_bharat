const Course = require("../model/course.model");
const Module = require("../model/module.model");
const Faq = require("../model/faq.model");
const Question = require("../model/questions.model");
const Assignment = require("../model/assignment.model");
const User = require("../model/user.model");
const Video = require("../model/video.model");
const Submission = require("../model/submission.model");;
const {extractFileUrlOrKey} = require("../utils/fileHelper");
const Admin = require("../model/admin.model");
const deleteFromS3 = require("../utils/deleteAws");
const { generateSignedUrl, s3Client, generateUploadUrl } = require("../service/aws.service");




////////////////////////
// course feature //
////////////////////////

exports.postNewCourse = async (req, res) => {
	const { title, description, courseContain, instructorName, instructorDescription } = req.body;
     console.log(req.file);
	const courseThumbnail = extractFileUrlOrKey(req.files["courseThumbnail"][0]);
	const instructorPicture = extractFileUrlOrKey(req.files["instructorPicture"][0]);


	if (instructorPicture === null) throw new Error('instructor image is required');
	if (courseThumbnail === null) throw new Error('course image is required');

	if (!title || !description || !instructorName || !courseContain) {
		return res.status(400).json({
			status: "fail",
			message: "Title, description, and instructorName are required"
		});
	}

	const newCourse = {
		title,
		description,
		courseContain,
		instructorName,
		instructorDescription,
		courseThumbnail,
		instructorPicture,
		createdBy: req.user._id,
	};
	try {
		const postedCourse = await Course.create(newCourse);

		res.status(201).json({
			status: "success",
			data: {
				course: postedCourse
			},
		})
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message: err.message
		})
	}
};


exports.updateCourseDetails = async (req, res) => {
	const { id } = req.params;
	try {
		const canUpdate = [
			"title",
			"description",
			"courseContain",
			"instructorName",
			"instructorDescription",
			"instructorPicture",
			"courseThumbnail"
		];

		const requiredUpdate = {};
		const course = await Course.findById(id);

		const courseThumbnail = extractFileUrlOrKey(req, "courseThumbnail");
		const instructorPicture = extractFileUrlOrKey(req, "instructorPicture");

		if (instructorPicture) {
			if (course.instructorPicture) {
				await deleteFromS3(course.instructorPicture);
			}
			requiredUpdate["instructorPicture"] = instructorPicture; // new one
		}


		if (courseThumbnail) {
			if (course.courseThumbnail) {
				await deleteFromS3(course.courseThumbnail);
			}
			requiredUpdate["courseThumbnail"] = courseThumbnail; // new one
		}

		// Handle text fields
		for (let field of canUpdate) {
			if (req.body[field] !== undefined) {
				requiredUpdate[field] = req.body[field];
			}
		}

		if (Object.keys(requiredUpdate).length === 0) {
			return res.status(400).json({
				status: "fail",
				message: "Invalid fields or no valid field provided for update"
			});
		}

		// Await update
		const updatedCourse = await Course.findByIdAndUpdate(id, requiredUpdate, {
			new: true,
			runValidators: true
		});

		if (!updatedCourse) {
			return res.status(404).json({
				status: "fail",
				message: "Course not found"
			});
		}

		return res.status(200).json({
			status: "success",
			data: updatedCourse
		});

	} catch (err) {
		return res.status(400).json({
			status: "fail",
			message: err.message
		});
	}
};



exports.getCourseReview = async (req, res) => {
	try {
		const { courseId } = req.params;
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const skip = (page - 1) * limit;

		const course = await Course.findById(courseId).select('_id name');
		if (!course) {
			return res.status(404).json({
				status: "fail",
				message: "Course not found"
			});
		}

		const reviews = await Course.aggregate([
			{ $match: { _id: course._id } },
			{ $unwind: "$ratings" },
			{ $sort: { "ratings.createdAt": -1 } },
			{
				$facet: {
					paginatedReviews: [
						{ $skip: skip },
						{ $limit: limit },
						{
							$lookup: {
								from: "users",
								localField: "ratings.user",
								foreignField: "_id",
								as: "ratings.userDetails"
							}
						},
						{ $unwind: "$ratings.userDetails" },
						{
							$project: {
								_id: 0,
								user: {
									_id: "$ratings.userDetails._id",
									name: "$ratings.userDetails.name",
									profilePicture: "$ratings.userDetails.profilePicture"
								},
								rating: "$ratings.rating",
								review: "$ratings.review",
								createdAt: "$ratings.createdAt"
							}
						}
					],
					totalCount: [{ $count: "count" }]
				}
			}
		]);

		const totalCount = reviews[0].totalCount[0]?.count || 0;

		return res.status(200).json({
			status: "success",
			data: {
				course,
				reviews: reviews[0].paginatedReviews,
				pagination: {
					totalReviews: totalCount,
					currentPage: page,
					totalPages: Math.ceil(totalCount / limit)
				}
			}
		});

	} catch (err) {
		return res.status(400).json({
			status: "fail",
			message: err.message
		});
	}
};


exports.getCourse = async (req, res) => {
	try {
		const  {id}  = req.params;
		// console.log(req);
        // console.log(id);
		const course = await Course.findById(id)
			.populate({
				path: "module",
				select: "name video assignment",
				populate: [
					{ path: "video", select: "title duration" },
					{ path: "assignment", select: "title" }
				]
			})
			.select("name description courseContain instructorName instructorPicture instructorDescription module video assignment");

			console.log(course);

		if (!course) {
			return res.status(404).json({
				status: "fail",
				message: "Course not found"
			});
		}

		let totalAssignments = 0;
		let totalDuration = 0;

		course.module.forEach((mod) => {
			totalAssignments += mod.assignments?.length || 0;
			mod.videos?.forEach((video) => {
				totalDuration += video.duration || 0;
			});
		});

		return res.status(200).json({
			status: "success",
			data: {
				...course.toObject(),
				totalAssignments,
				totalDuration
			}
		});

	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: err.message
		});
	}
};
exports.getAllCourse = async (req, res) => {
	try {
		 const allCourses = await Course.find().select(
			"name courseThumbnail description averageRating totalRatings instructorName"
		 );

		console.log(allCourses);

		

		if (allCourses.length === 0) {
			return res.status(404).json({
				status: "fail",
				message: "No courses found"
			});
		}

		return res.status(200).json({
			status: "success",
			results: allCourses.length,
			data: allCourses
		});

	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: err.message
		});
	}
};
exports.giveRatingToCourse = async (req, res) => {
	try {
		const { userId, courseId } = req.params;
		const { rating, review } = req.body;

		// Validate rating
		if (!rating || rating < 1 || rating > 5) {
			return res.status(400).json({
				status: "fail",
				message: "Rating value should be between 1 and 5"
			});
		}

		const user = await User.findOne({ _id: userId, coursePurchased: courseId });
		if (!user) {
			return res.status(404).json({
				status: "fail",
				message: "User not found or user has not purchased this course"
			});
		}

		// Fetch course
		const course = await Course.findById(courseId);
		if (!course) {
			return res.status(404).json({
				status: "fail",
				message: "Course not found"
			});
		}

		// Find existing rating
		const existingRatingIndex = course.ratings.findIndex(
			(r) => r.user.toString() === userId
		);

		if (existingRatingIndex !== -1) {
			// Update existing rating
			course.ratings[existingRatingIndex].rating = rating;
			course.ratings[existingRatingIndex].review =
				review || course.ratings[existingRatingIndex].review;
		} else {

			if (review && review.length < 10) {
				return res.status(400).json({
					status: "fail",
					message: "Review must be at least 10 characters long"
				});
			}


			course.ratings.push({ user: userId, rating, review });
		}

		// Update aggregate fields
		const totalRatings = course.ratings.length;
		const averageRating =
			course.ratings.reduce((acc, r) => acc + r.rating, 0) / totalRatings;

		course.totalRatings = totalRatings;
		course.averageRating = averageRating;


		await course.save();

		return res.status(200).json({
			status: "success",
			data: {
				courseId: course._id,
				averageRating: course.averageRating,
				totalRatings: course.totalRatings,
				ratings: course.ratings
			}
		});
	} catch (err) {
		return res.status(500).json({
			status: "fail",
			message: err.message
		});
	}
};
///////////////////////
// module features///
//////////////////////

exports.createCourseModule = async (req, res) => {
	try {
		const { id } = req.params;
		const { name } = req.body;

		// validate input
		if (!name || name.length < 5) {
			throw new Error("Module name should be at least 5 characters long");
		}

		const course = await Course.findById(id);
		if (!course) throw new Error("Course not found");

		// create module
		const module = await Module.create({ name, courseId: id });


		await Course.findByIdAndUpdate({_id:id}, { $push: { module: module._id } });

		return res.status(201).json({
			status: "success",
			message: "Module created successfully",
			data: module
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message: err.message
		});
	}
};

// Update Course Module
exports.updateCourseModule = async (req, res) => {
	try {
		const { id } = req.params;
		const { name } = req.body;


		const module = await Module.findById(	id
		);

		if (!module) throw new Error("Module not found");

		if(name)  module.name = name;

		await module.save();



		return res.status(200).json({
			status: "success",
			message: "Module updated successfully",
			data: module
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message: err.message
		});
	}
};


exports.deleteCourseModule = async (req, res) => {
	try {
		const { id } = req.params;


		const module = await Module.findById(id);
		if (!module) throw new Error("Module not found to perform delete action");


		if (module.video?.length > 0) {
			await Video.deleteMany({ _id: { $in: module.video } });
		}


		if (module.assignment?.length > 0) {
			await Assignment.deleteMany({ _id: { $in: module.assignment } });
		}


		

		const {courseId} = module;

		await Course.findByIdAndUpdate(
			{_id:courseId},
			{ $pull: { module: id } },
			{ new: true }
		);

		await Module.findByIdAndDelete(id);

		return res.status(200).json({
			status: "success",
			message: "Module and its related videos & assignments deleted successfully"
		});
	} catch (err) {
		return res.status(400).json({
			status: "fail",
			message: err.message
		});
	}
};
////////////////////
//  faq feature //
///////////////////
exports.createFAQ = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, description } = req.body;

		// validate
		if (!name || !description) {
			throw new Error("Please provide a valid name and description");
		}

		// check course exists
		const course = await Course.findById(id);
		if (!course) throw new Error("Course not found");

		// create FAQ
		const faq = await Faq.create({ name, description, courseId: id });

		// push faq reference into course
		await Course.findByIdAndUpdate(id, { $push: { faq: faq._id } });

		return res.status(201).json({
			status: "success",
			data: faq
		});
	} catch (err) {
		return res.status(400).json({
			status: "fail",
			message: err.message
		});
	}
};

// Update FAQ
exports.updateFAQ = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, description } = req.body;

		console.log(req.params);

		const faq = await Faq.findOneAndUpdate(
			{  _id: id },
			{ name, description }
		);
		console.log(faq);

		if (!faq) throw new Error("FAQ not found for this course");

		return res.status(200).json({
			status: "success",
			data: faq
		});
	} catch (err) {
		return res.status(400).json({
			status: "fail",
			message: err.message
		});
	}
};

// Delete FAQ
exports.deleteFAQ = async (req, res) => {
	try {
		const { id } = req.params;

		// find and delete
		const faq = await Faq.findById( id );
		if (!faq) throw new Error("FAQ not found for this course");

		const {courseId, _id } = faq;

		await Course.findByIdAndUpdate({_id: courseId},{$pull:{faq: _id}});

		await Faq.findByIdAndDelete(_id);


		console.log(faq);

		return res.status(200).json({
			status: "success",
			message: "FAQ deleted successfully",
			data: null
		});
	} catch (err) {
		return res.status(400).json({
			status: "fail",
			message: err.message
		});
	}
};
//////////////////////
// assignment feature //
//////////////////////

exports.createAssignment = async (req, res) => {
	try {
		const { name, typeOfAssignment } = req.body;
        const {id} = req.params;
		let newAssignment;

		if (typeOfAssignment === "pdf") {

			const pdfUrl = extractFileUrlOrKey(req, "assignmentDoc");

			if (!pdfUrl) throw new Error("pdf url not found");

			newAssignment = await Assignment.create({
				name,
				typeOfAssignment,
				module: id,
				pdfUrl
			});
		}
		else if (typeOfAssignment === "mcq") {



			newAssignment = await Assignment.create({
				name,
				typeOfAssignment,
				module: id
			});
		}
		else {
			throw new Error("Invalid assignment type");
		}

		return res.status(201).json({
			status: "success",
			data: newAssignment
		});
	} catch (err) {
		return res.status(400).json({
			status: "fail",
			message: err.message
		});
	}
};


exports.updateAssignment = async (req, res) => {
	try {
		const {id} = req.params;
		const { name, typeOfAssignment } = req.body;

		const assignment = await Assignment.findById(id);

		if (!assignment) throw new Error("assignment not found");

		if (name) assignment.name = name;

		if (typeOfAssignment) {
			assignment.typeOfAssignment = typeOfAssignment;

			if (typeOfAssignment === 'pdf') {
				const pdfUrl = extractFileUrlOrKey(req, "assignmentDoc");


				assignment.pdfUrl = pdfUrl || assignment.pdfUrl;
				assignment.question = [];
			} else if (typeOfAssignment === 'mcq') {
				pdfUrl = null;
			}
		};



		await assignment.save();


		return res.status(200).json({
			status: "success",
			data: assignment
		});
	} catch (err) {


		return res.status(400).json({
			status: "fail",
			message: err.message
		})
	}

}

exports.deleteAssignment = async (req, res) => {
	const {id} = req.params;

	try {
		const assignment = await Assignment.findById(id);
		if (!assignment) throw new Error('Assignment not found');

		// Delete related content
		if (assignment.typeOfAssignment === 'mcq' && assignment.question?.length > 0) {
			await Question.deleteMany({ _id: { $in: assignment.question } });
		} else if (assignment.typeOfAssignment === 'pdf') {

			if (assignment.pdfUrl) {
				if (assignment.pdfUrl) {

					await s3Client
						.deleteObject({
							Bucket: process.env.AWS_BUCKET_NAME,
							Key: assignment.pdfUrl,
						})
						.promise();
				}
			}
		} else {
			throw new Error('Invalid assignment type');
		}

		if (assignment.module) {
			await Module.findByIdAndUpdate(
				assignment.module,
				{ $pull: { assignments: id } },
				{ new: true }
			);
		}

		await Assignment.findByIdAndDelete(id);

		return res.status(200).json({
			status: 'success',
			message: 'Assignment deleted successfully'
		});
	} catch (err) {
		return res.status(400).json({
			status: 'fail',
			message: err.message
		});
	}
};


////////////////////////
// mcq feature ///
//////////////////////

exports.createMcqAssignment = async (req, res) => {
	try {
		const { id } = req.params;

		const { name, options, answer } = req.body;

		const assignment = Assignment.findById(id);

		if (!assignment) throw new Error('assignment not found');

		const mcqAssignment = await Question.create({ name, options, answer, assignment: id })

		await assignment.findByIdAndUpdate({_id:id}, { $push: { question: mcqAssignment._id } })


		return res.status(201).json({
			status: 'success',
			message: mcqAssignment
		})
	} catch (err) {

		return res.status(400).json({
			status: 'success',
			message: err.message
		})
	}
};


exports.updateMcqAssignment = async (req, res) => {
	try {
		const { id } = req.params; // make sure your route includes both
		const { name, options, answer } = req.body;

		if (!id) {
			throw new Error("MCQ ID missing");
		}

		const mcqAssignment = await Question.findById(id);
		if (!mcqAssignment) throw new Error("MCQ assignment not found");

		// Update only provided fields
		if (name) mcqAssignment.name = name;
		if (options && Array.isArray(options)) mcqAssignment.options = options;
		if (answer) mcqAssignment.answer = answer;

		await mcqAssignment.save();

		return res.status(200).json({
			status: "success",
			data: mcqAssignment
		});

	} catch (err) {
		return res.status(400).json({
			status: "fail",
			message: err.message
		});
	}
};


exports.deleteSingleMcqAssignment = async (req, res) => {
	try {
		const { id } = req.params;

		if (!id) {
			throw new Error(" MCQ ID missing");
		}

		const mcq = await Question.findById(id);

		if (!mcq) throw new Error("assignment or mcq not found");

        const {assignment} = mcq ;

		await Assignment.findByIdAndUpdate({_id:assignment}, { $pull: { question: id } }, { new: true })


		await Question.findByIdAndDelete(id);

		return res.status(200).json({
			status: "success",
			message: "MCQ deleted successfully"
		})

	} catch (err) {
		return res.status(400).json({
			status: "fail",
			message: err.message
		})
	}
};

exports.getAllMcqAssignment = async (req, res) => {
	try {
		const { id } = req.params;

		const assignment = await Assignment.findById(id).populate({
			path: "question",
			select: "name options",

		}).select("name question");

		const {name,options} = assignment.question;

         console.log(assignment);

		if (!assignment) throw new Error("assignment not found or not an mcq assignment");
		return res.status(200).json({
			status: "success",
			data: assignment
		});
	} catch (err) {
		return res.status(400).json({
			status: "fail",
			message: err.message
		})
	}
};



exports.submitMcqByUser = async (req, res) => {
	try {
		const { assignmentId } = req.params;
		const { userId, answers } = req.body;

		if (!assignmentId || !userId || !answers || !Array.isArray(answers)) {
			throw new Error("Assignment ID, User ID, or answers missing/invalid");
		}

		// Fetch assignment with questions
		const assignment = await Assignment.findById(assignmentId).populate("question");
		if (!assignment || assignment.typeOfAssignment !== "mcq") {
			throw new Error("Assignment not found or is not an MCQ type");
		}

		const totalQuestions = assignment.question.length;

		if (answers.length !== totalQuestions) {
			throw new Error("Number of answers does not match number of questions");
		}

		let score = 0;
		const detailResults = [];

		assignment.question.forEach((question, index) => {
			const userAnswer = answers[index];
			const isCorrect = question.answer === userAnswer;
			if (isCorrect) score++;

			detailResults.push({
				questionId: question._id,
				question: question.name,
				options: question.options,
				userAnswer,
				correct: isCorrect,
				...(isCorrect ? {} : { correctAnswer: question.answer }),
			});
		});

		// Save submission to DB
		const submission = await Submission.create({
			user: userId,
			assignment: assignmentId,
			typeOfAssignment: "mcq",
			answers: answers.map((ans, idx) => ({
				question: assignment.question[idx]._id,
				answer: ans,
			})),
			score,
			submittedAt: new Date(),
		});

		return res.status(200).json({
			status: "success",
			data: {
				submissionId: submission._id,
				score,
				totalQuestions,
				detailResults,
			},
		});
	} catch (err) {
		return res.status(400).json({
			status: "fail",
			message: err.message,
		});
	}
};



////////////////////////
///pdf assignment ///
///////////////////////


exports.getPdfAssignment = async (req, res) => {
	try {
		const { assignmentId } = req.params;

		if (!assignmentId) throw new Error("assignment id is required");

		const assignment = await Assignment.findById(assignmentId).select("name pdfUrl typeOfAssignment");

		if (!assignment || assignment.typeOfAssignment !== "pdf") {
			throw new Error("assignment not found or not a pdf assignment");
		};


		//for now anyone can access the pdf
		// later we will implement that only enrolled user can access the pdf
		if (!req.user) {
			throw new Error("you are not authorized to access this pdf");
		}

		const url = generateSignedUrl(assignment.pdfUrl, 60 * 5);

		return res.status(200).json({
			status: "success",
			data: url
		});
	} catch (err) {
		return res.status(400).json({
			status: "fail",
			message: err.message
		})
	}
};

exports.submitAssignmentByUser = async (req, res) => {
	try {
		const { assignmentId, userId } = req.params;

		const user = await User.findById(userId);

		if (!user) throw new Error("user not found");

		const submissionUrl = extractFileUrlOrKey(req, "submissionDoc");

		if (!submissionUrl) throw new Error("pdf url is required");

		const assignment = await Assignment.findById(assignmentId);

		if (!assignment || assignment.typeOfAssignment !== "pdf") {
			throw new Error("assignment not found or not a pdf assignment");
		}

		const alreadySubmitted = await Submission.findOne({ user: userId, assignment: assignmentId });

		if (alreadySubmitted) {
			throw new Error("you have already submitted this assignment");
		}
		const submission = await Submission.create({
			user: userId,
			assignment: assignmentId,
			typeOfAssignment: "pdf",
			pdfAnswerUrl: submissionUrl
		});

		return res.status(200).json({
			status: "success",
			data: submission
		})

	} catch (err) {
		return res.status(400).json({
			status: "fail",
			message: err.message
		})
	}
};




exports.getVideoUploadUrl = async (req, res) => {
	try {
		const { fileName, fileType } = req.body;

		if (!fileName || !fileType) {
			throw new Error("fileName and fileType are required");
		}

		const key = `videos/raw/${Date.now()}-${fileName}`;

		const uploadUrl = await generateUploadUrl(key, fileType);

		return res.status(200).json({
			status: "success",
			uploadUrl,
			fileKey: key,
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message: err.message
		});
	}
};

exports.createVideo = async (req, res) => {
	try {
		const { name, fileKey, duration, moduleId, subtitle } = req.body;

		if (!name || !fileKey || !moduleId || subtitle) {
			throw new Error("name, fileKey, and moduleId are required");
		}

		const subtitleUrl = extractFileUrlOrKey(req);

		if (!subtitleUrl) {
			throw new Error("subtitle file is required");
		}
		const newVideo = await Video.create({
			name,
			videoURL: fileKey, // store S3 key, not signed URL
			duration,
			moduleId,
			status: "processing",
			subtitle: subtitleUrl
		});

		return res.status(201).json({
			status: "success",
			data: newVideo
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message: err.message
		});
	}
};