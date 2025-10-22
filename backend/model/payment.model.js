const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	paymentId: { type: String },
	accountNumber: { type: String },
	expiryDate: { type: String },
	upiId: { type: String },
	isDefault: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);



