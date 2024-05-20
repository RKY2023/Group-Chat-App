const path = require('path');

const express = require('express');

const threadController = require('../controllers/thread');

const userController = require('../controllers/user');

const router = express.Router();

router.post('/sendMsg', threadController.sendMsg);

router.post('/getThread', threadController.getThread);

router.get('/checkGroup', userController.authenticate, threadController.checkGroup);

router.post('/newGroup', userController.authenticate, threadController.newGroup);

router.get('/groupList', threadController.groupList);

router.post('/loadGroupChat', userController.authenticate, threadController.loadGroupChat);

router.post('/groupInfo', userController.authenticate, threadController.groupInfo);

module.exports = router;
