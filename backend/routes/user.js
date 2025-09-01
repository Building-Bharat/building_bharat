
const userController = require('../controller/userController');
const express = require('express');
const router = express.Router();


router.get('/:id', userController.getUserById);


module.exports = router;