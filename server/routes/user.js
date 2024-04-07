const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/api', userController.apiTest);

router.post('/api/signup', userController.signupAPI);

router.post('/api/login', userController.loginAPI);

module.exports = router;
