// const AWS = require('aws-sdk');
// const AWS = require('aws-sdk');

// AWS.config.update({
// 	accessKeyId: process.env.AWS_ACCESS_ID,
// 	secretAccessKey: process.env.AWS_SECRET,
// 	region: process.env.AWS_REGION // e.g., 'ap-south-1'
// });

// const s3 = new AWS.S3();

// module.exports = s3;


const { S3Client } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");



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

const generateSignedUrl = async (key, expiresIn = 60 * 5) => {

	const command = new GetObjectCommand({
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: key,
	});

	return await getSignedUrl(s3Client, command, { expiresIn });
};



const deleteFromS3 = async (fileKey) => {

	if (!fileKey) return;
	try {
		await s3Client.deleteObject({
			Bucket: process.env.AWS_BUCKET_NAME,
			Key: fileKey
		}).promise();
	} catch (err) {
		console.error("Failed to delete old file from S3:", err.message);
	}
};
module.exports = { s3Client, generateSignedUrl, generateUploadUrl, deleteFromS3 };