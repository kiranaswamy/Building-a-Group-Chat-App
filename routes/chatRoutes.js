const express = require('express');
const router = express.Router();
const chatController = require('../controller/chatController');

router.post('/send', chatController.sendMessage);
router.get('/personal/:userA/:userB', chatController.getMessages);

module.exports = router;
