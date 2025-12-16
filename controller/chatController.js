// controller/chatController.js
const Message = require('../models/messageModel');

exports.sendMessage = async (req, res) => {
  try {
    const { userId, message } = req.body;

    if (!userId || !message) {
      return res.status(400).json({ message: 'User and message required' });
    }

    const chat = await Message.create({
      userId,
      text:message
    });

    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMessages = async (req, res) => {
  const chats = await Message.findAll({
    include: ['User'],
    order: [['createdAt', 'ASC']]
  });

  res.status(200).json(chats);
};
