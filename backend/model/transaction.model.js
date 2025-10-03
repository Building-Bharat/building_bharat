const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
	transactionId: { type: String, required: true, unique: true },
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	orderId: { type: String, required: true },
	paymentId: { type: String },
	signature: { type: String },
	paymentMethod: { type: String },
	amount: { type: Number, required: true },
	currency: { type: String, default: 'INR' },
	status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
	initiatedAt: { type: Date, default: Date.now },
	completedAt: { type: Date },
	failureReason: { type: String }
});

module.exports = mongoose.model('Transaction', transactionSchema);



