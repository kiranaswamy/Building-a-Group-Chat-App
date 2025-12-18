// const Message = require('../models/messageModel');

// module.exports = (io) => {
//   io.on('connection', (socket) => {
//     console.log('User connected:', socket.id);

//     socket.on('chatMessage', async ({ text, userId }) => {
//       try {
//         const savedMessage = await Message.create({ text, userId });
//         io.emit('chatMessage', {
//           text: savedMessage.text,
//           userId: savedMessage.userId,
//           createdAt: savedMessage.createdAt
//         });
//       } catch (err) {
//         console.error('DB error:', err);
//       }
//     });

//     socket.on('disconnect', () => {
//       console.log('User disconnected:', socket.id);
//     });
//   });
// };


const Message = require('../models/messageModel');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // --- GLOBAL CHAT ---
    socket.on('chatMessage', async ({ text, userId }) => {
      try {
        const savedMessage = await Message.create({ text, userId });
        io.emit('chatMessage', {
          text: savedMessage.text,
          userId: savedMessage.userId,
          createdAt: savedMessage.createdAt
        });
      } catch (err) {
        console.error('DB error:', err);
      }
    });

    // --- PRIVATE CHAT ---
    socket.on('joinPrivate', ({ userId, targetUserId }) => {
      const roomId = [String(userId), String(targetUserId)].sort().join('_');

      // --- CHECK NUMBER OF USERS IN ROOM ---
      const room = io.sockets.adapter.rooms.get(roomId);
      const numClients = room ? room.size : 0;

      if (numClients >= 2) {
        // reject if room already has 2 users
        socket.emit('roomFull', { message: "This private chat already has 2 users." });
        return;
      }

      socket.join(roomId);
      console.log(`User ${userId} joined private room: ${roomId}`);
    });

    socket.on('privateMessage', async ({ text, userId, targetUserId }) => {
      try {
        const roomId = [String(userId), String(targetUserId)].sort().join('_');

        const savedMessage = await Message.create({ text, userId });

        // Send only to users in this private room
        io.to(roomId).emit('privateMessage', {
          text: savedMessage.text,
          userId: savedMessage.userId,
          targetUserId,
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
