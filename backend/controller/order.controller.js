const Order = require('../model/order.model');
const Course = require('../model/course.model');

// Razorpay order creation placeholder (use Razorpay SDK in real integration)
exports.createOrder = async (req, res) => {
	try {
		const { userId, courseId } = req.body;
		const course = await Course.findById(courseId);
		if (!course) return res.status(404).json({ message: 'Course not found' });

		// Here integrate Razorpay order creation and get order id
		const razorpayOrderId = 'order_' + Date.now();

		const newOrder = new Order({
			orderId: razorpayOrderId,
			userId,
			courseId,
			price: course.price,
			status: 'created'
		});
		await newOrder.save();
		return res.json({ order: newOrder, payment_order_id: razorpayOrderId });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

exports.getOrderDetails = async (req, res) => {
	try {
		const { orderId } = req.params;
		const order = await Order.findOne({ orderId }).populate('courseId');
		if (!order) return res.status(404).json({ message: 'Order not found' });
		return res.json(order);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};



