const path = require('path');

const express = require('express');

const threadController = require('../controllers/thread');

const router = express.Router();

router.post('/sendMsg', threadController.sendMsg);

router.post('/getThread', threadController.getThread);

module.exports = router;
