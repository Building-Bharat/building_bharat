const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	orderId: { type: String, required: true, unique: true },
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: false },
	originalPrice: { type: Number, required: true },
	price: { type: Number, required: true }, // Final price after discount
	currency: { type: String, default: 'INR' },
	coupon: {
		code: { type: String },
		discountAmount: { type: Number, default: 0 },
		discountType: { type: String, enum: ['percentage', 'fixed'] }
	},
	status: { type: String, enum: ['created', 'paid', 'failed'], default: 'created' },
	createdAt: { type: Date, default: Date.now },
	paidAt: { type: Date }
});

module.exports = mongoose.model('Order', orderSchema);



