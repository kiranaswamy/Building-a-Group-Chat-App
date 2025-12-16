const express = require('express');
const cors = require("cors");
const { Server } = require('socket.io');
const http = require("http");

const app = express();
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, { cors: { origin: "*" } });
global.io = io;

// DB and models
const db = require('./util/db-connect');
const Message = require('./models/messageModel'); // import your message model
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');

require('./models');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('server is created'));

app.use('/user', userRoutes);
app.use('/chat', chatRoutes);

// 🔴 Socket.IO connection
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('sendMessage', async (msgData) => {
    try {
      // Save message in DB
      const chat = await Message.create({
        userId: msgData.userId,
        text: msgData.text
      });

      // Broadcast saved message to all clients
      io.emit('receiveMessage', chat);

    } catch (err) {
      console.error('Error saving message:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Start server
db.sync({ force: true })
.then(() => {
  server.listen(3000, () => {
    console.log('server is running with Socket.IO and DB storage');
  });
})
.catch(err => console.log(err));
