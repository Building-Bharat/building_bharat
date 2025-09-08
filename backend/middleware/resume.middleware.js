const multer = require("multer");
const multerS3 = require("multer-s3");
const s3Client = require("../service/aws.service");

const upload = multer({
	storage: multerS3({
		s3: s3Client,
		bucket: process.env.AWS_BUCKET_NAME,
		acl: "private", // Keep it private for security
		contentType: multerS3.AUTO_CONTENT_TYPE,
		key: (req, file, cb) => {
			const fileName = `resumes/${Date.now()}-${file.originalname}`;
			cb(null, fileName);
		}
	}),
	limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
	fileFilter: (req, file, cb) => {
		if (file.mimetype === "application/pdf") {
			cb(null, true);
		} else {
			cb(new Error("Only PDF files are allowed"), false);
		}
	}
});

module.exports = upload;