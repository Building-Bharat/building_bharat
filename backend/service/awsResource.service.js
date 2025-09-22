const multer = require("multer");
const multerS3 = require("multer-s3");
const {s3Client} = require("./aws.service");


const upload = multer({
	storage: multerS3({
		
		s3: s3Client,
		bucket: process.env.AWS_BUCKET_NAME,
		contentType: multerS3.AUTO_CONTENT_TYPE,

		// Set ACL dynamically
		acl: (req, file, cb) => {
			const type = req.fieldname;
			const publictype = ["instructorPicture", "blogPicture", "courseThumbnail"]

			if (publictype.includes(file.fieldname)) {
				cb(null, "public-read"); // public images
			} else {
				cb(null, "private"); // secure PDFs
			}
		},

		// Set file path (S3 key)
		key: (req, file, cb) => {
			const type = file.fieldname;

			let folder;
			if (type === "resumes") folder = "resumes";
			else if (type === "instructorPicture") folder = "instructorPicture";
			else if (type === "blogPicture") folder = "blogPicture";
			else if (type === "courseThumbnail") folder = "courseThumbnail";
			else if (type === "assignmentDoc") folder = "assignmentDoc";
			else if (type === "submissionDoc") folder = "submissionDoc";
			else if (type === "subtitle") folder = "subtitles";
			else return cb(new Error("Invalid type"), false);

			const fileName = `${folder}/${Date.now()}-${file.originalname}`;
			cb(null, fileName);
		},
	}),

	limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file

	// File filter
	fileFilter: (req, file, cb) => {
		const type = req.fieldname;
		console.log("req.body:", req);
        console.log("file:", file);

		if (file.fieldname === "resumes" || file.fieldname === "assignmentDoc" || file.fieldname === "submissionDoc") {
			if (file.mimetype === "application/pdf") cb(null, true);
			else cb(new Error("Only PDF files are allowed"), false);
		}
		else if (type === "subtitle") {
			if (file.mimetype === "text/vtt" || file.mimetype === "application/x-subrip") cb(null, true);
			else cb(new Error("Only VTT or SRT subtitle files are allowed"), false);
		}
		else if (
			file.fieldname === "instructorPicture" ||
			file.fieldname === "blogPicture" ||
			file.fieldname === "courseThumbnail"
		) {
			if (["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(file.mimetype))
				cb(null, true);
			else cb(new Error("Only JPG/PNG/WEBP images are allowed"), false);
		}
		else {
			cb(new Error("Invalid type"), false);
		}
	},
});

module.exports = upload;
