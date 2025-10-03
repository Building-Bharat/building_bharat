const express = require('express');
const router = express.Router();
const orderCtrl = require('../controller/order.controller');

router.post('/', orderCtrl.createOrder);
router.get('/:orderId', orderCtrl.getOrderDetails);

module.exports = router;



