// const AWS = require('aws-sdk');

// AWS.config.update({
// 	accessKeyId: process.env.AWS_ACCESS_ID,
// 	secretAccessKey: process.env.AWS_SECRET,
// 	region: process.env.AWS_REGION // e.g., 'ap-south-1'
// });

// const s3 = new AWS.S3();

// module.exports = s3;


const { S3Client } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_ID,
		secretAccessKey: process.env.AWS_SECRET
	}
});
module.exports = s3Client;