const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/api', userController.apiTest);

router.post('/api/signup', userController.signupAPI);

router.post('/api/login', userController.loginAPI);

router.get('/api/onlineUsers', userController.getOnlineUsers);

module.exports = router;
