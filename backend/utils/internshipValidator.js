const { body, validationResult } = require('express-validator');

const internshipValidatationRules = () => [
	body('name').notEmpty().isString().withMessage('Name is required and should be a string'),


	body('skills').notEmpty().isArray({
		min: 1
	}).withMessage('Skills are required and should be an array'),

	body('applyBy').isISO8601().withMessage('Apply By date is required and should be a valid in YYYY-MM-DD date').custom((value) => {
		const now = new Date();
		if (new Date(value) < now) {
			throw new Error('Apply By date must be in the future');
		}
		return true;
	})
];

exports.default = { internshipValidatationRules };