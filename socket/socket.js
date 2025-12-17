const Message = require('../models/messageModel');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // ✅ JOIN PRIVATE ROOM
    socket.on('joinPrivate', ({ userId, targetUserId }) => {
      const roomId = [userId, targetUserId].sort().join('_');
      socket.join(roomId);
    });

    // ✅ PRIVATE CHAT MESSAGE (2 users only)
    socket.on('chatMessage', async (data) => {
      try {
        const roomId = [data.userId, data.targetUserId].sort().join('_');

        const savedMessage = await Message.create({
          text: data.text,
          userId: data.userId
        });

        io.to(roomId).emit('chatMessage', {
          text: savedMessage.text,
          userId: savedMessage.userId,
          createdAt: savedMessage.createdAt
        });

      } catch (err) {
        console.error('DB error:', err);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
