const express = require('express');
const router = express.Router();
const txCtrl = require('../controller/transaction.controller');

router.post('/webhook', txCtrl.handleWebhook);
router.get('/', txCtrl.getAllTransactions);
router.get('/:transactionId', txCtrl.getTransactionDetails);
router.delete('/:transactionId', txCtrl.deleteTransaction);

module.exports = router;



