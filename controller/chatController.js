// controller/chatController.js

// const Message = require('../models/messageModel');
// const User = require('../models/userModel');

// exports.sendMessage = async (req, res) => {
//   try {
//     const { userId, message } = req.body;

//     if (!userId || !message) {
//       return res.status(400).json({ message: 'User and message required' });
//     }

//      const user = await User.findByPk(Number(userId));
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const chat = await Message.create({
//       userId:user.id,
//       message: message,
//        senderName: user.name,
//     });

 
//     if (global.io) {
//       global.io.emit("receiveMessage", chat);
//     }

//     res.status(201).json(chat);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.getMessages = async (req, res) => {
//   try{
//   const chats = await Message.findAll({
//     include: [{model:User,as:'sender'}],
//     order: [['createdAt', 'ASC']]
//   });

//   res.status(200).json(chats);
// }catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


const { Op } = require('sequelize');
const Message = require('../models/messageModel');
const User = require('../models/userModel');

// Send personal message
exports.sendMessage = async (req, res) => {
  try {
    const { userId, recipientId, message } = req.body;

    if (!userId || !recipientId || !message) {
      return res.status(400).json({ message: 'User, recipient, and message required' });
    }

    const sender = await User.findByPk(Number(userId));
    if (!sender) return res.status(404).json({ message: 'Sender not found' });

    const recipient = await User.findByPk(Number(recipientId));
    if (!recipient) return res.status(404).json({ message: 'Recipient not found' });

    const chat = await Message.create({
      userId: sender.id,
      recipientId,
      message,
      senderName: sender.name,
    });

    // Emit only to both sender and recipient if using socket.io rooms
    if (global.io) {
      global.io.to(`user_${sender.id}`).to(`user_${recipientId}`).emit("receiveMessage", chat);
    }

    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get messages between two users
exports.getMessages = async (req, res) => {
  try {
    const { userA, userB } = req.params;

    if (!userA || !userB) {
      return res.status(400).json({ message: 'Both user IDs required' });
    }

    const chats = await Message.findAll({
      where: {
        [Op.or]: [
          { userId: userA, recipientId: userB },
          { userId: userB, recipientId: userA },
        ],
      },
      order: [['createdAt', 'ASC']],
    });

    res.status(200).json(chats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
