const express = require('express');
const router = express.Router();
const orderCtrl = require('../controller/order.controller');

router.post('/', orderCtrl.createOrder);
router.post('/verify-payment', orderCtrl.verifyPayment);
router.get('/:orderId', orderCtrl.getOrderDetails);

module.exports = router;



