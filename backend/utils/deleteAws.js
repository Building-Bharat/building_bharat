const s3Client = require("../service/aws.service");

exports.deleteFromS3 = async (fileKey) => {
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