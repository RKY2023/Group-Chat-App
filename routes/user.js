const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/', userController.signup);

router.post('/api/signup', userController.signupAPI);

module.exports = router;
