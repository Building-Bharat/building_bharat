const { default: mongoose } = require('mongoose');
const Internship = require('../model/internship.model');
const User = require('../model/user.model');
const { extractFileUrlOrKey } = require('../utils/fileHelper');
const { body, validationResult } = require('express-validator');
const { default: application } = require('../model/application');


exports.createInternship = async (req, res) => {
	// const checkValidate = validationResult(req);

	// if (!checkValidate.isEmpty()) {
	// 	throw new Error({
	// 		message: 'Validation failed',
	// 		errors: checkValidate.array()
	// 	})
	// }

	const { name, description, skills, duration, stipend, applyBy ,location,responsibilities,frim} = req.body;
  
	const newInternship = {
		name,
		description,
		skills,
		duration,
		stipend,
		applyBy,
		location,
		responsibilities,
		frim,
		image:"random image"
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
		console.log(error)
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
		console.log(err)
		return res.status(500).json({
			status: 'error',
			message: err.message
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


exports.getSingleApplicantDetails = async (req, res) => {
	const { internshipId, applicationId } = req.params;
	try {
		if (!mongoose.Types.ObjectId.isValid(internshipId) || !mongoose.Types.ObjectId.isValid(applicationId)) {
			return res.status(400).json({
				status: 'fail',
				message: 'Invalid ID(s) provided'
			});
		}

		const internship = await Internship.findById(internshipId);
		const application = internship.applications.id(applicationId);

		if (!internship || !application) {
			return res.status(404).json({
				status: 'fail',
				message: 'Internship or application not found'
			});
		}


		res.status(200).json({
			status: 'success',
			data: {
				internship,
				application
			}
		});
	} catch (err) { }
}
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
		// 1)  user must have atleast course
		// 2) user can apply to internship which dont require course
		// if (id) {

		// };	
		const {
			fullName,
			mobile,
			email,
			location,
			resume,
			college,
			degree,
			major,
			startMonth: eduStartMonth,
			startYear: eduStartYear,
			endMonth: eduEndMonth,
			endYear: eduEndYear,
			currentlyStudyingEducation
		} = req.body;

        // resume = extractFileUrlOrKey(req);
		const internshipId = req.params.id;
        
        /**
		 * The user should be identified using their logged-in account ID, not the email they enter while applying.
		 * This ensures that only authenticated users can apply for the internship
		 */
		const user = await User.findOne({ email:req.user.email });  
		const internship = await Internship.findById(internshipId);
        
		
		if (!user || !internship) {
			throw new Error('User or Internship not found');
		};

		if (new Date() > internship.applyBy) {
			throw new Error('The last date to apply for this internship has passed');
		};
         
		if (user.appliedInternship.some(app => app.internshipId.toString() === internshipId.toString())) {
			return res.status(400).json({ status: 'error', message: 'You have already applied for this internship' });
		}
         
		user.appliedInternship.push({
			internshipId: internship._id,
			resume
		});

        const applied = await application.create({
			fullName,
			mobile,
			email,
			location,
			resume,
			internship,
			college,
			degree,
			major,
			user:req.user,
			startMonth: eduStartMonth,
			startYear: eduStartYear,
			endMonth: eduEndMonth,
			endYear: eduEndYear,
			currentlyStudyingEducation
		})
       if (!internship.applications.includes(applied._id)) {
		  internship.applications.push(applied._id);
	    };
       	
		await user.save({ validateBeforeSave: false });
		await internship.save({ validateBeforeSave: false });

		res.status(200).json({
			status: 'success',
			message: 'You have successfully applied for the internship',
			applied
	    });

	 } 
	   catch (error) {
		   console.log(error)
		 return res.status(500).json({
			 status: 'error',
	     	 message: error.message
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


// for all user to view internship details 
exports.getInternshipById = async (req, res) => {
  try {
    const { id } = req.params;
    const internship = await Internship.findById(id);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    res.status(200).json({
      success: true,
      data: internship,
    });
  } catch (error) {
    console.error("Error fetching internship by ID:", error);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};

exports.updateInternship = async (req, res) => {
  const { id } = req.params; // internship id
  const { name, description, skills, duration, stipend, applyBy, location, responsibilities, internshipType } = req.body;

  try {
    const updatedInternship = await Internship.findByIdAndUpdate(
      id,
      {
        name,
        description,
        skills,
        duration,
        stipend,
        applyBy,
        location,
        responsibilities,
        internshipType,
      },
      { new: true, runValidators: true } // return updated doc & validate schema
    );

    if (!updatedInternship) {
      return res.status(404).json({
        status: "fail",
        message: "Internship not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        internship: updatedInternship,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
