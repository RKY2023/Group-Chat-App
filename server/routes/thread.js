const path = require('path');
const fs = require('fs');
const express = require('express');

// const multipart = require('connect-multiparty');
// const multipartMiddleware = multipart();
const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       const uploadPath = path.join(__dirname, 'uploads');
//       // Create the uploads directory if it doesn't exist
//       if (!fs.existsSync(uploadPath)) {
//           fs.mkdirSync(uploadPath, { recursive: true });
//       }
//       cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//       cb(null, Date.now() + path.extname(file.originalname));
//   }
// });
const storage = multer.memoryStorage({
});
const upload = multer({storage});

const threadController = require('../controllers/thread');

const userController = require('../controllers/user');

const router = express.Router();

router.post('/sendMsg', threadController.sendMsg);

router.post('/getThread', threadController.getThread);

router.get('/checkGroup', userController.authenticate, threadController.checkGroup);

router.post('/newGroup', userController.authenticate, threadController.newGroup);

router.get('/groupList', userController.authenticate, threadController.groupList);

router.post('/loadGroupChat', userController.authenticate, threadController.loadGroupChat);

router.post('/groupInfo', userController.authenticate, threadController.groupInfo);

router.post('/addAdmin', userController.authenticate, threadController.addAdmin);

router.post('/removeAdmin', userController.authenticate, threadController.removeAdmin);

router.post('/updateGroupMember', userController.authenticate, threadController.updateGroupMember);

// router.post('/imgThread', multipartMiddleware, threadController.imgThread);
router.post('/imgThread',upload.single('file'), threadController.imgThread);

module.exports = router;
