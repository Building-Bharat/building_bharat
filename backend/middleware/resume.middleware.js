const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../service/aws.service');

const upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: process.env.AWS_BUCKET_NAME,
		acl: 'private', // private so only admin can access
		key: function (req, file, cb) {
			const fileName = `resumes/${Date.now()}_${file.originalname}`;
			cb(null, fileName);
		},
		limits: {
			fileSize: 5 * 1024 * 1024
		}
	})
});

module.exports = upload;
