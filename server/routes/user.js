const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/api', userController.apiTest);

router.post('/api/signup', userController.signupAPI);

router.post('/api/login', userController.loginAPI);

router.get('/api/onlineUsers', userController.getOnlineUsers);

router.get('/userList', userController.authenticate, userController.userList);

router.post('/searchUser', userController.searchUser);

module.exports = router;
