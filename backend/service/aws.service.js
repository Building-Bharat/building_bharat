// const AWS = require('aws-sdk');
// const AWS = require('aws-sdk');

// AWS.config.update({
// 	accessKeyId: process.env.AWS_ACCESS_ID,
// 	secretAccessKey: process.env.AWS_SECRET,
// 	region: process.env.AWS_REGION // e.g., 'ap-south-1'
// });

// const s3 = new AWS.S3();

// module.exports = s3;


const { S3Client, s3 } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { PutObjectCommand } = require("@aws-sdk/client-s3");


const s3Client = new S3Client({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_ID,
		secretAccessKey: process.env.AWS_SECRET
	}
});

const generateUploadUrl = async (key, contentType, expiresIn = 300) => {
	const command = new PutObjectCommand({
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: key,
		ContentType: contentType,
	});

	return await getSignedUrl(s3Client, command, { expiresIn });
};

const generateSignedUrl = (key, expiresIn = 60 * 5) => {
	return s3.getSignedUrlPromise("getObject", {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: key,
		Expires: expiresIn, // 5 min default
	});
};
module.exports = { s3Client, generateSignedUrl, generateUploadUrl };