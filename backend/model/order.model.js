const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	orderId: { type: String, required: true, unique: true },
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
	price: { type: Number, required: true },
	currency: { type: String, default: 'INR' },
	status: { type: String, enum: ['created', 'paid', 'failed'], default: 'created' },
	createdAt: { type: Date, default: Date.now },
	paidAt: { type: Date }
});

module.exports = mongoose.model('Order', orderSchema);



