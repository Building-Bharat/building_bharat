const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Order = require('../model/order.model');
const User = require('../model/user.model');

// Razorpay Webhook Handler
router.post('/razorpay', async (req, res) => {
	try {
		console.log('📥 Webhook received from Razorpay');
		
		// Verify webhook signature
		const signature = req.headers['x-razorpay-signature'];
		
		if (!signature) {
			console.log('❌ No signature in webhook request');
			return res.status(400).json({ error: 'No signature provided' });
		}
		
		// Get raw body as string
		const body = JSON.stringify(req.body);
		
		// Create expected signature
		const expectedSignature = crypto
			.createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
			.update(body)
			.digest('hex');
		
		// Verify signature
		if (signature !== expectedSignature) {
			console.log('❌ Invalid webhook signature');
			console.log('Expected:', expectedSignature);
			console.log('Received:', signature);
			return res.status(400).json({ error: 'Invalid signature' });
		}
		
		console.log('✅ Webhook signature verified');
		
		// Process webhook event
		const event = req.body.event;
		const payload = req.body.payload;
		
		console.log('📦 Event type:', event);
		
		if (event === 'payment.captured') {
			// Payment successful
			const payment = payload.payment.entity;
			const orderId = payment.order_id;
			
			console.log('💰 Payment captured for order:', orderId);
			console.log('💳 Payment ID:', payment.id);
			console.log('💵 Amount:', payment.amount / 100);
			
			// Find the order
			const order = await Order.findOne({ orderId });
			
			if (!order) {
				console.log('⚠️ Order not found:', orderId);
				return res.status(200).json({ message: 'Order not found, but acknowledged' });
			}
			
			// Check if already processed
			if (order.status === 'paid') {
				console.log('ℹ️ Order already marked as paid:', orderId);
				return res.status(200).json({ message: 'Already processed' });
			}
			
			// Update order status
			order.status = 'paid';
			order.paidAt = new Date();
			order.razorpayPaymentId = payment.id;
			await order.save();
			
			console.log('✅ Order status updated to paid');
			
			// Add course to user's purchased courses
			console.log('🔍 [WEBHOOK] Checking if course should be added to user');
			console.log('  - order.courseId:', order.courseId);
			console.log('  - order.userId:', order.userId);
			console.log('  - order.coupon:', order.coupon);
			
			if (order.courseId && order.userId) {
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
						console.log('👤 User ID:', user._id);
						console.log('📚 Course ID:', order.courseId);
						console.log('📚 User now has', user.coursePurchased.length, 'courses');
					} else {
						console.log('ℹ️ User already has this course');
					}
				} else {
					console.log('❌ User not found:', order.userId);
				}
			} else {
				console.log('⚠️ [WEBHOOK] Cannot add course: courseId or userId is missing/null');
				console.log('  - courseId is null/missing:', !order.courseId);
				console.log('  - userId is null/missing:', !order.userId);
			}
			
			// Increment coupon usage count if coupon was used
			if (order.coupon && order.coupon.code) {
				console.log('🎟️ [WEBHOOK] Processing coupon usage for:', order.coupon.code);
				
				try {
					const Coupon = require('../model/coupon.model');
					const coupon = await Coupon.findOne({ code: order.coupon.code.toUpperCase() });
					
					if (coupon) {
						// Check if this order has already been counted
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
							console.log('✅ [WEBHOOK] Coupon usage count incremented');
							console.log('   - Coupon:', coupon.code);
							console.log('   - New usage count:', coupon.usedCount + 1);
							console.log('   - Usage limit:', coupon.usageLimit || 'Unlimited');
						} else {
							console.log('ℹ️ [WEBHOOK] Coupon usage already counted for this order');
						}
					} else {
						console.log('⚠️ [WEBHOOK] Coupon not found:', order.coupon.code);
					}
				} catch (couponError) {
					console.error('❌ [WEBHOOK] Error updating coupon usage:', couponError);
					// Don't fail the webhook if coupon update fails
				}
			} else {
				console.log('ℹ️ [WEBHOOK] No coupon used in this order');
			}
			
			console.log('✅ Webhook processed successfully');
			
		} else if (event === 'payment.failed') {
			// Payment failed
			const payment = payload.payment.entity;
			const orderId = payment.order_id;
			
			console.log('❌ Payment failed for order:', orderId);
			
			// Update order status
			const order = await Order.findOne({ orderId });
			if (order) {
				order.status = 'failed';
				await order.save();
				console.log('✅ Order status updated to failed');
			}
		} else {
			console.log('ℹ️ Unhandled event type:', event);
		}
		
		// Always respond with 200 to acknowledge receipt
		res.status(200).json({ status: 'ok' });
		
	} catch (error) {
		console.error('❌ Webhook processing error:', error);
		// Still return 200 to prevent Razorpay from retrying
		res.status(200).json({ error: 'Internal error, but acknowledged' });
	}
});

module.exports = router;

