const Course = require("../model/course.model");
const Module = require("../model/questions.model");
const Faq = require("../model/faq.model");
const Question = require("../model/questions.model");
const Assignment = require("../model/assignment.model");
const User = require("../model/user.model");
const Video = require("../model/video.model");
const Submission = require("../model/submission.model");;
const extractFileUrlOrKey = require("../utils/fileHelper");

////////////////////////
// course feature //
////////////////////////

exports.postNewCourse = async (req, res) => {
	const { title, description, courseContain, instructorName, instructorDescription } = req.body;

	const courseThumbnail = extractFileUrlOrKey(req, "courseThumbnail");
	const instructorPicture = extractFileUrlOrKey(req, "instructorPicture");

	if (instructorPicture === null) throw new Error('instructor image is required');
	if (courseThumbnail === null) throw new Error('course image is required');

	if (!title || !description || !instructorName || !courseContain) {
		return res.status(400).json({
			status: "fail",
			message: "Title, description, and instructorName are required"
		});
	}

	const newCourse = await Course.create({
		title,
		description,
		courseContain,
		instructorName,
		instructorDescription,
		courseThumbnail,
		instructorPicture,
	});
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
		const canUpdate = ["title",
			"description",
			"courseContain",
			"instructorName",
			"instructorDescription",
			"instructorPicture",
			"courseThumbnail"];

		const requiredUpdate = {};

		const courseThumbnail = extractFileUrlOrKey(req, "courseThumbnail");
		const instructorPicture = extractFileUrlOrKey(req, "instructorPicture");


		if (instructorPicture) {
			requiredUpdate['instructorPicture'] = instructorPicture;
		}
		if (courseThumbnail) {
			requiredUpdate['courseThumbnail'] = courseThumbnail;
		}

		for (let fileds of canUpdate) {
			if (req.body[fileds] !== undefined) {
				requiredUpdate[fileds] = fileds;
			}
		};

		if (Object.keys(requiredUpdate).length == 0) {
			throw new Error("invalid fields or no valid filed provid for update");
		};

		const updatedCourse = Course.findByIdAndUpdate(id, requiredUpdate, {
			new: true,
			runValidators: true
		});

		if (!updatedCourse) throw new Error("course not found");

		return res.status(200).json({
			status: "success",
			data: updatedCourse
		})
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message: err.message
		})
	};
};


exports.getCourseReview = async (req, res) => {
	try {
		const { courseId } = req.params;
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const skip = (page - 1) * limit;

		const course = await Course.findById(courseId).select('_id name');
		if (!course) throw new Error('course not found');

		const reviews = await Course.aggregate([
			{
				$match: { _id: course._id }
			},
			{
				$unwind: '$ratings'
			},
			{
				$sort: { 'ratings.createdAt': -1 }
			},
			{
				$facet: {
					paginatedReview: [
						{ $skip: skip },
						{ $limit: limit },

						{
							$lookup: {
								from: 'users',
								localField: 'ratings.user',
								foreignField: '_id',
								as: 'ratings.userDetails'
							}
						},

						{
							$unwind: '$ratings.userDetails'
						},
						{
							$project: {
								_id: 0,
								user: {
									_id: "$ratings.user._id",
									name: "$ratings.user.name",
									profilePicture: "$ratings.user.profilePicture"
								},
								rating: "$ratings.rating",
								review: "$ratings.review",
								createdAt: "$ratings.createdAt"
							}
						}
					],
					totalCount: [{ $count: "count" }]
				}
			},

		]);

		const totalCount = reviews[0].totalCount[0]?.count || 0;

		return res.status(200).json({
			status: "success",
			data: {
				course, reviews: reviews[0].paginatedReviews,
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
		})
	}
}


exports.getCourse = async (req, res) => {
	try {
		const { courseId } = req.params;

		const course = await Course.findById(courseId).populate({
			path: "module",
			select: "name videos assignments",
			populate: [
				{ path: "videos", select: "title duration" },
				{ path: "assignments", select: "title" }
			]
		}
		)
			.select('name description courseContain instructorName instructorPicture instructorDescription');

		if (!course) {
			throw new Error('course not not trying again');
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
			data: course
		})
	}
	catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err.message
		})
	}
};


exports.getAllCourse = async (req, res) => {
	try {
		const Allcourse = await Course.find().select('name courseThumbnail description averageRating totalRatings instructorName');

		if (!Allcourse) {
			throw new Error('course not found');
		}

		return res.status(200).json({
			status: "success",
			data: Allcourse
		});

	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err.message
		})
	}
}

exports.giveRatingToCourse = async (req, res) => {
	try {
		const { userId, courseId } = req.params;
		const { rating, review } = req.body;
		if (!rating || rating < 1 || rating > 5) {
			throw new Error("rating value should be between 1 to 5");
		}

		const user = await User.findById({ userId, coursePurchased: courseId });

		if (!user) throw new Error("user not found or user not purchased this course");

		const course = await Course.findById(courseId);

		if (!course) throw new Error("course not found");

		const existingRatingIndex = course.ratings.findIndex(r => r.user.toString() === userId);


		if (existingRatingIndex !== -1) {
			course.ratings[existingRatingIndex].rating = rating;
			course.ratings[existingRatingIndex].review = req.body.review || course.ratings[existingRatingIndex].review;
		} else {
			if (review && review.length > 20) {
				course.ratings.push({ user: userId, rating, review });
			}
		}


		return res.status(200).json({
			status: "success",
			data: course
		});
	}
	catch (err) {
		res.status(400).json({
			status: "fail",
			message: err.message
		})
	}
}

///////////////////////
// module features///
//////////////////////

exports.createCourseModule = async (req, res) => {
	try {

		const { courseId } = req.params;
		const { name } = req.body;

		const course = await Course.findById(courseId);

		if (!course) throw new Error("course not found");


		if (!name || name.length < 4) throw new Error("module name length should be minimum of 5 charater long need");

		const module = await Module.create({ name, course: courseId });


		await course.findOneAndUpdate({ courseId }, { $push: { module: module._id } })

		return res.status(200).json({
			status: 'Module created',
			data: module
		});

	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err.message
		});
	}
};



exports.updateCourseModule = async (req, res) => {
	try {
		const { courseId, moduleId } = req.params;
		const course = Course.findById(courseId);

		const { name } = req.body;

		if (!course) throw new Error('course not found');

		const module = Module.findByIdAndUpdate(moduleId, { name, course: courseId }, { new: true, runValidators: true });

		if (!module) throw new Error('module not found'
		)

		return res.status(201).json({
			status: 'update',
			data: module
		})
	}
	catch (err) {
		res.status(400).json({
			status: "fail",
			message: err.message
		})
	};
};


exports.getCourseModule = async (req, res) => {
	try {
		const { id } = req.params;

		const moduleObj = await Module.findById(id);
		if (!moduleObj) throw new Error("module not found");

		return res.status(200).json({
			data: { module: moduleObj }
		});
	}
	catch (err) {
		res.status(400).json({
			status: "fail",
			message: err.message
		});
	}
}


exports.deleteCourseModule = async (req, res) => {
	try {
		const { moduleId, courseId } = req.params;

		if (!module) {
			throw new Error("module not found to perform delete action");
		};


		if (module.videos && module.videos.length > 0) {
			await Video.deleteMany({ _id: { $in: module.videos } });
		}

		if (module.assignments && module.assignments.length > 0) {
			await Assignment.deleteMany({ _id: { $in: module.assignments } });
		}

		await Module.findByIdAndDelete(moduleId);

		await Course.findOneAndUpdate(courseId, { $pull: { module: moduleId } }, { new: true });

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

	const { courseId } = req.params;

	const course = Course.findById(courseId);

	const { name, description } = req.body;

	if (!course || !name || !description)
		throw new Error('please provide the valid name and description');

	try {
		const faq = await Faq.create({ name, description, course: courseId });

		course.findByIdAndUpdate(courseId, { $push: { faq: faq._id } })

		return res.status(201).json({
			status: "success",
			data: faq
		})

	} catch (err) {
		return res.status(400).json({
			status: "fail",
			message: req.message
		})
	}
};

exports.updateFAQ = async (req, res) => {
	try {
		const { courseId, faqId } = req.params;
		const { name, description } = req.body;


		const course = await Course.findById(courseId);
		if (!course) throw new Error("Course not found");

		const faq = await FAQ.findOneAndUpdate(
			{ _id: faqId, course: courseId },
			{ name, description },
			{ new: true, runValidators: true }
		);

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


exports.deleteFQA = async (req, res) => {
	try {
		const { courseId, faqId } = req.params;

		course = await Course.findById(courseId);

		const faq = Faq.findOneAndDelete({ _id: faqId, courseId });

		if (!faq) throw new Error("faq not found please select valid faq");

		await Course.findByIdAndUpdate(courseId, {
			$pull: { faqs: faqId }
		});

		return res.status(200).json({
			status: "success",
			data: null
		})
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err.message
		})
	}
};

//////////////////////
// assignment feature //
//////////////////////

exports.createAssignment = async (req, res) => {
	try {
		const { name, typeOfAssignment, moduleId, pdfUrl } = req.body;

		let newAssignment;

		if (typeOfAssignment === "pdf") {
			if (!pdfUrl) throw new Error("PDF URL required for pdf assignment");

			newAssignment = await Assignment.create({
				name,
				typeOfAssignment,
				module: moduleId,
				pdfUrl
			});
		}
		else if (typeOfAssignment === "mcq") {
			newAssignment = await Assignment.create({
				name,
				typeOfAssignment,
				module: moduleId
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
		const assignmentId = req.params;
		const { name, typeOfAssignment, pdfUrl } = req.body;

		const assignment = Assignment.findById(assignmentId);

		if (!assignment) throw new Error("assignment not found");

		if (name) assignment.name = name;

		if (typeOfAssignment) {
			assignment.typeOfAssignment = typeOfAssignment;

			if (typeOfAssignment === 'pdf') {
				if (!pdfUrl) throw new Error("pdf url not found");

				assignment.pdfUrl = pdfUrl;
				assignment.question = [];
			} else if (typeOfAssignment === 'mcq') {
				pdfUrl = null;
			}
		};

		if (assignment.typeOfAssignment === "pdf" && pdfUrl) {
			assignment.pdfUrl = pdfUrl;
		}

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
	const { assignmentId } = req.params;

	try {
		const assignment = await Assignment.findById(assignmentId);
		if (!assignment) throw new Error('Assignment not found');

		// Delete related content
		if (assignment.typeOfAssignment === 'mcq' && assignment.question?.length > 0) {
			await Question.deleteMany({ _id: { $in: assignment.question } });
		} else if (assignment.typeOfAssignment === 'pdf') {

			if (assignment.pdfUrl) {

			}
		} else {
			throw new Error('Invalid assignment type');
		}

		if (assignment.module) {
			await Module.findByIdAndUpdate(
				assignment.module,
				{ $pull: { assignments: assignmentId } },
				{ new: true }
			);
		}

		await Assignment.findByIdAndDelete(assignmentId);

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
		const { assignmentId } = req.params;

		const { name, options, answer } = req.body;

		const assignment = Assignment.findById(assignmentId);

		if (!assignment) throw new Error('assignment not found');

		const mcqAssignment = await Question.create({ name, options, answer, assignment: assignmentId })

		await assignment.findByIdAndUpdate(assignmentId, { $push: { question: mcqAssignment._id } })


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
		const { assignmentId, mcqId } = req.params; // make sure your route includes both
		const { name, options, answer } = req.body;

		if (!assignmentId || !mcqId) {
			throw new Error("Assignment ID or MCQ ID missing");
		}

		const mcqAssignment = await Question.findById(mcqId);
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
		const { assignmentId, mcqId } = req.params;

		if (!assignmentId || !mcqId) {
			throw new Error("Assignment ID or MCQ ID missing");
		}

		const assignment = await Assignment.findById(assignmentId);

		const mcq = await Question.findById(mcqId);

		if (!assignment || !mcq) throw new Error("assignment or mcq not found");

		if (String(mcq.assignment) !== String(assignmentId)) {
			throw new Error("This MCQ does not belong to the given assignment");
		}

		await Assignment.findByIdAndUpdate(assignmentId, { $pull: { question: mcqId } }, { new: true })


		await Question.findByIdAndDelete(mcqId);

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
		const { assignmentId } = req.params;

		const assignment = await Assignment.findById(assignmentId).populate({
			path: "question",
			select: "name options",
		}).select("name question");

		if (!assignment || !assignment.typeOfAssignment !== 'mcq') throw new Error("assignment not found or not an mcq assignment");
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

		return res.status(200).json({
			status: "success",
			data: assignment.pdfUrl
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

		const { submissionUrl } = req.body;

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