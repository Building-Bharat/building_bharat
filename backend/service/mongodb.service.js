const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

if (!process.env.MONGO_URI || !process.env.MONGO_PASS) {
	console.error("Missing MongoDB credentials in .env");
	process.exit(1);
}

const db = process.env.MONGO_URI.replace('<db_password>', process.env.MONGO_PASS);

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		console.log('MongoDB connected');
	} catch (err) {
		console.error('DB connection error:', err.message);
		process.exit(1);
	}
};

module.exports = connectDB;

// const models = mongoose.models;
