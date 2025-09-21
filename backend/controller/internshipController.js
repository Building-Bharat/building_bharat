const { default: mongoose } = require('mongoose');
const Internship = require('../model/internship.model');
const User = require('../model/user.model');
const { extractFileUrlOrKey } = require('../utils/fileHeloer');

exports.createInternship = async (req, res) => {
	// const checkValidate = validationResult(req);

	// if (!checkValidate.isEmpty()) {
	// 	throw new Error({
	// 		message: 'Validation failed',
	// 		errors: checkValidate.array()
	// 	})
	// }

	const { name, description, skills, duration, stipend, applyBy } = req.body;

	const newInternship = {
		name,
		description,
		skills,
		duration,
		stipend,
		applyBy
	};

	try {
		const createdInternship = await Internship.create(newInternship);
		res.status(201).json({
			status: 'success',
			data: {
				internship: createdInternship
			}
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message: error.message
		});
	}
};


exports.deleteInternship = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.status(400).json({
			status: 'fail',
			message: 'Invalid internship ID'
		});
	}

	try {
		await Internship.findByIdAndDelete(id);
		res.status(204).json({
			status: 'success',
			data: null
		});
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: 'Error deleting internship'
		});
	}
}




exports.adminGetAllInternships = async (req, res) => {
	try {
		const internships = await Internship.find();
		res.status(200).json({
			status: 'success',
			data: {
				internships
			}
		});
	} catch (err) {
		return res.status(500).json({
			status: 'error',
			message: 'Error fetching all internships'
		});
	}
}


exports.getApplicantsForInternship = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({
			status: 'fail',
			message: 'Invalid internship ID'
		});
	}

	try {
		const internship = await Internship.findById(id).populate('applications.User');

		if (!internship) {
			return res.status(404).json({
				status: 'fail',
				message: 'Internship not found'
			});
		}

		res.status(200).json({
			status: 'success',
			data: {
				internshipTitle: internship.name,
				totalApplicants: internship.applications.length,
				applications: internship.applications
			}
		});
	} catch (err) {
		return res.status(500).json({
			status: 'error',
			message: err.message
		});
	}
};



//user controller 
exports.getAllInternships = async (req, res) => {
	try {
		const internships = await Internship.find({
			applyBy: { $gte: new Date() }
		});
		res.status(200).json({
			status: 'success',
			data: {
				internships
			}
		});
	} catch (err) {
		return res.status(500).json({
			status: 'error',
			message: 'Error fetching internships'
		});
	}
};

exports.applyInternshipById = async (req, res) => {
	try {
		const { name, email } = req.body;

		const resume = extractFileUrlOrKey(req);

		if (resume === null) throw new Error('Resume is required');

		const internshipId = req.params.id;

		const user = await User.findOne({ email });

		const internship = await Internship.findById(internshipId);

		if (!user || !internship) {
			throw new Error('User or Internship not found');
		};

		if (new Date() > internship.applyBy) {
			throw new Error('The last date to apply for this internship has passed');
		};

		if (user.appliedInternship.some(app => app.internshipId.toString() === internshipId)) {
			return res.status(400).json({ status: 'error', message: 'You have already applied for this internship' });
		}

		user.appliedInternship.push({
			internshipId: internship._id,
			resume
		});


		if (!internship.applications.includes(user._id)) {
			internship.applications.push(user._id);
		};

		await user.save();
		await internship.save();

		res.status(200).json({
			status: 'success',
			message: 'You have successfully applied for the internship'
		});


	}
	catch (err) {
		return res.status(500).json({
			status: 'error',
			message: err.message
		});
	}
};

exports.getAllAppliedInternships = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).populate('appliedInternship.internshipId');
		res.status(200).json({
			status: 'success',
			data: {
				internships: user.appliedInternship
			}
		});
	} catch (err) {
		return res.status(500).json({
			status: 'error',
			message: err.message
		});
	}
};
