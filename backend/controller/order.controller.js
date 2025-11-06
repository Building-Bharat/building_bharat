const mongoose = require('mongoose');
const Razorpay = require('razorpay');
const Order = require('../model/order.model');
const Course = require('../model/course.model');

// Initialize Razorpay
const razorpay = new Razorpay({
	key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_1234567890',
	key_secret: process.env.RAZORPAY_KEY_SECRET || 'test_secret_key'
});

// Razorpay order creation with coupon support
exports.createOrder = async (req, res) => {
	try {
		console.log('📝 Order creation request body:', req.body);
		
		const { userId, courseId, originalPrice, finalPrice, coupon } = req.body;
		
		// Validate required fields
		if (!userId) {
			return res.status(400).json({ error: 'User ID is required' });
		}
		
		// Use provided prices or fetch from course
		let coursePrice = originalPrice || 6999;
		let orderPrice = finalPrice || coursePrice;
		let validCourseId = null;
		
		// Handle courseId validation and conversion
		if (courseId && courseId !== 'default-course' && mongoose.Types.ObjectId.isValid(courseId)) {
			try {
				const course = await Course.findById(courseId);
				if (course) {
					console.log('📚 Found course:', course.title, 'Price:', course.price);
					coursePrice = course.price || coursePrice;
					if (!finalPrice) orderPrice = coursePrice;
					validCourseId = courseId;
				} else {
					console.log('⚠️ Course not found for ID:', courseId);
				}
			} catch (courseError) {
				console.log('⚠️ Course lookup failed:', courseError.message);
				// Continue with default values
			}
		} else {
			console.log('ℹ️ Using default course pricing (courseId invalid or default)');
		}

		// Create Razorpay order
		const razorpayOrderOptions = {
			amount: orderPrice * 100, // Amount in paise
			currency: 'INR',
			receipt: 'order_' + Date.now(),
			notes: {
				userId: userId.toString(),
				courseId: validCourseId ? validCourseId.toString() : 'default',
				couponCode: coupon ? coupon.code : '',
				originalPrice: coursePrice,
				discount: coursePrice - orderPrice
			}
		};

		console.log('💰 Creating Razorpay order with:', razorpayOrderOptions);

		let razorpayOrder;
		try {
			// Try to create actual Razorpay order
			razorpayOrder = await razorpay.orders.create(razorpayOrderOptions);
			console.log('✅ Razorpay order created:', razorpayOrder.id);
		} catch (razorpayError) {
			console.error('⚠️ Razorpay API failed (likely invalid credentials), using test mode:', razorpayError.message);
			
			// Fallback to test mode for development
			razorpayOrder = {
				id: 'order_test_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
				entity: 'order',
				amount: orderPrice * 100,
				amount_paid: 0,
				amount_due: orderPrice * 100,
				currency: 'INR',
				receipt: razorpayOrderOptions.receipt,
				status: 'created',
				attempts: 0,
				notes: razorpayOrderOptions.notes,
				created_at: Math.floor(Date.now() / 1000)
			};
			console.log('✅ Test order created:', razorpayOrder.id);
		}

		// Save order to database
		const newOrder = new Order({
			orderId: razorpayOrder.id,
			userId,
			courseId: validCourseId,
			originalPrice: coursePrice,
			price: orderPrice,
			coupon: coupon ? {
				code: coupon.code,
				discountAmount: coupon.discountAmount,
				discountType: coupon.discountType
			} : undefined,
			status: 'created'
		});
		
		await newOrder.save();
		
		console.log('✅ Order saved to database:', newOrder.orderId);
		
		return res.json({ 
			order: newOrder, 
			payment_order_id: razorpayOrder.id,
			amount: orderPrice,
			currency: 'INR',
			razorpay_order: razorpayOrder
		});
	} catch (err) {
		console.error('❌ Order creation error:', err);
		return res.status(500).json({ 
			error: err.message,
			details: process.env.NODE_ENV === 'development' ? err.stack : undefined
		});
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

// Verify Razorpay payment
exports.verifyPayment = async (req, res) => {
	try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
		
		console.log('🔐 Verifying payment signature');
		console.log('Order ID:', razorpay_order_id);
		console.log('Payment ID:', razorpay_payment_id);
		
		if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
			return res.status(400).json({ 
				success: false, 
				message: 'Missing payment details' 
			});
		}
		
		// Verify signature using Razorpay
		const crypto = require('crypto');
		const body = razorpay_order_id + '|' + razorpay_payment_id;
		
		const expectedSignature = crypto
			.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
			.update(body)
			.digest('hex');
		
		if (expectedSignature !== razorpay_signature) {
			console.log('❌ Invalid payment signature');
			return res.status(400).json({ 
				success: false, 
				message: 'Invalid payment signature' 
			});
		}
		
		console.log('✅ Payment signature verified');
		
		// Find and update order
		const order = await Order.findOne({ orderId: razorpay_order_id });
		
		if (!order) {
			return res.status(404).json({ 
				success: false, 
				message: 'Order not found' 
			});
		}
		
		// Check if already processed
		if (order.status === 'paid') {
			console.log('ℹ️ Order already marked as paid');
			return res.status(200).json({ 
				success: true, 
				message: 'Payment already verified',
				order 
			});
		}
		
		// Update order status
		order.status = 'paid';
		order.paidAt = new Date();
		order.razorpayPaymentId = razorpay_payment_id;
		await order.save();
		
		console.log('✅ Order status updated to paid');
		
		// Add course to user's purchased courses
		console.log('🔍 Checking if course should be added to user');
		console.log('  - order.courseId:', order.courseId);
		console.log('  - order.userId:', order.userId);
		console.log('  - order.coupon:', order.coupon);
		
		if (order.courseId && order.userId) {
			const User = require('../model/user.model');
			const user = await User.findById(order.userId);
			
			if (user) {
				console.log('👤 User found:', user.email);
				// Check if course already in purchased list
				const alreadyPurchased = user.coursePurchased.some(
					courseId => courseId.toString() === order.courseId.toString()
				);
				
				if (!alreadyPurchased) {
					user.coursePurchased.push(order.courseId);
					await user.save();
					console.log('✅ Course added to user\'s purchased courses');
					console.log('📚 User now has', user.coursePurchased.length, 'courses');
				} else {
					console.log('ℹ️ User already has this course');
				}
			} else {
				console.log('❌ User not found for ID:', order.userId);
			}
		} else {
			console.log('⚠️ Cannot add course: courseId or userId is missing/null');
			console.log('  - courseId is null/missing:', !order.courseId);
			console.log('  - userId is null/missing:', !order.userId);
		}
		
		// Increment coupon usage count if coupon was used
		if (order.coupon && order.coupon.code) {
			console.log('🎟️ Processing coupon usage for:', order.coupon.code);
			
			try {
				const Coupon = require('../model/coupon.model');
				const coupon = await Coupon.findOne({ code: order.coupon.code.toUpperCase() });
				
				if (coupon) {
					// Check if this order has already been counted (to prevent double-counting)
					const alreadyCounted = coupon.usedBy.some(
						usage => usage.orderId === order.orderId
					);
					
					if (!alreadyCounted) {
						// Increment usage count
						await coupon.applyCoupon(
							order.userId, 
							order.orderId, 
							order.coupon.discountAmount || 0
						);
						console.log('✅ Coupon usage count incremented');
						console.log('   - Coupon:', coupon.code);
						console.log('   - New usage count:', coupon.usedCount + 1);
						console.log('   - Usage limit:', coupon.usageLimit || 'Unlimited');
					} else {
						console.log('ℹ️ Coupon usage already counted for this order');
					}
				} else {
					console.log('⚠️ Coupon not found:', order.coupon.code);
				}
			} catch (couponError) {
				console.error('❌ Error updating coupon usage:', couponError);
				// Don't fail the payment verification if coupon update fails
			}
		} else {
			console.log('ℹ️ No coupon used in this order');
		}
		
		res.status(200).json({
			success: true,
			message: 'Payment verified successfully',
			order
		});
		
	} catch (error) {
		console.error('❌ Payment verification error:', error);
		res.status(500).json({ 
			success: false, 
			message: 'Error verifying payment',
			error: error.message 
		});
	}
};



