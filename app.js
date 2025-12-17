// const express = require('express');
// const cors = require("cors");
// const path = require('path');
// const { Server } = require('socket.io');
// const http = require("http");
// app.use(express.json());
// app.use(cors());

// const app = express();
// const server = http.createServer(app);

// // Socket.IO setup
// const io = new Server(server, { cors: { origin: "*" } });
// global.io = io;

// // DB and models
// const db = require('./util/db-connect');
// const Message = require('./models/messageModel'); // import your message model
// const userRoutes = require('./routes/userRoutes');
// const chatRoutes = require('./routes/chatRoutes');

// require('./models');


// app.get('/', (req, res) => res.send('server is created'));

// app.use('/user', userRoutes);
// app.use('/chat', chatRoutes);


// io.on('connection', (socket) => {
//   console.log('a user connected');

//   socket.on('sendMessage', async (msgData) => {
//     try {
//       // Save message in DB
//       const chat = await Message.create({
//         userId: msgData.userId,
//         text: msgData.text
//       });

//       // Broadcast saved message to all clients
//       io.emit('receiveMessage', chat);

//     } catch (err) {
//       console.error('Error saving message:', err);
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

// // Start server
// db.sync({ force: true })
// .then(() => {
//   server.listen(3000, () => {
//     console.log('server is running with Socket.IO and DB storage');
//   });
// })
// .catch(err => console.log(err));


const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const Message = require('./models/messageModel');
const db = require('./util/db-connect');

const app = express();
app.use(express.json());
app.use(cors());


app.use(express.static(path.join(__dirname, 'frontend')));


app.use('/user', userRoutes);
app.use('/chat', chatRoutes);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'chatWindow.html'));
});


const server = http.createServer(app);
const io = new Server(server);


io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('chatMessage', async (data) => {
    try {
      
      const savedMessage = await Message.create({
        text: data.text,
        userId: data.userId
      });

      
      io.emit('chatMessage', {
        text: savedMessage.text,
        userId: savedMessage.userId,
        createdAt: savedMessage.createdAt
      });

      console.log(`Message from ${data.userId}: ${savedMessage.text}`);
    } catch (err) {
      console.error('DB error:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


db.sync({ force: true }) 
  .then(() => {
    server.listen(3000, () => {
      console.log('Server running on port 3000 with DB connected');
    });
  })
  .catch(err => console.error('DB connection error:', err));
