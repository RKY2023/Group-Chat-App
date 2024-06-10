const path = require('path');

const express = require('express');

const userGroupController = require('../controllers/usergroups');

const router = express.Router();

router.post('/searchUserAndUserGroup', userGroupController.searchUserAndUserGroup);

router.post('/addUserGroup', userGroupController.addUserGroup);

module.exports = router;
