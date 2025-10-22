const Transaction = require('../model/transaction.model');
const Order = require('../model/order.model');
const User = require('../model/user.model');

exports.handleWebhook = async (req, res) => {
	try {
		const event = req.body;
		const txStatus = event.txStatus === 'SUCCESS' ? 'success' : 'failed';

		const transaction = new Transaction({
			transactionId: event.transaction_id,
			userId: event.customer_details?.customer_id,
			orderId: event.order_id,
			paymentId: event.payment_id,
			paymentMethod: event.payment_method,
			amount: event.order_amount,
			status: txStatus,
			completedAt: new Date(),
			failureReason: txStatus === 'failed' ? event.txMsg : undefined
		});
		await transaction.save();

		const order = await Order.findOneAndUpdate(
			{ orderId: event.order_id },
			{ status: txStatus, paidAt: txStatus === 'success' ? new Date() : null },
			{ new: true }
		);

		if (txStatus === 'success' && order) {
			await User.findByIdAndUpdate(
				order.userId,
				{ $addToSet: { coursePurchased: order.courseId } }
			);
		}

		return res.sendStatus(200);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

exports.getAllTransactions = async (req, res) => {
	try {
		const txs = await Transaction.find().sort({ initiatedAt: -1 });
		return res.json(txs);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

exports.getTransactionDetails = async (req, res) => {
	try {
		const { transactionId } = req.params;
		const tx = await Transaction.findOne({ transactionId });
		if (!tx) return res.status(404).json({ message: 'Transaction not found' });
		return res.json(tx);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

exports.deleteTransaction = async (req, res) => {
	try {
		const { transactionId } = req.params;
		await Transaction.deleteOne({ transactionId });
		return res.sendStatus(204);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};



