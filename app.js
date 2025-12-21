// // const express = require('express');
// // const http = require('http');
// // const path = require('path');
// // const{Server} = require('socket.io');

// // const app  = express();
// // const server = http.createServer(app);

// // const  io = new Server(server)


// // app.use(express.static(path.join(__dirname, 'frontend')));
// // app.get('/',(req,res)=>{
// //   res.sendFile(path.join(__dirname,"frontend","chatWindow.js"))
// // });

// // io.on('connection',(socket)=>{
// //   console.log('User conencted',socket.id);

// //   socket.on('chatMessage',(message)=>{
// //     console.log("user",socket.id,"said:",message)
// //     io.emit('chatMessage',{userId:socket.id,message})
// //   })
// // })

// // server.listen(3000,()=>{
// //   console.log('soket.Io servre is running in 3000 port')
// // })


// const express = require('express');
// const http = require('http');
// const path = require('path');
// const { Server } = require('socket.io');
// const cors = require('cors');
// require('dotenv').config();


// const app = express();
// app.use(express.json());

// const server = http.createServer(app);

// const db = require('./util/db-connect');
// const userRoute = require('./routes/userRoutes');
// const chatRoutes = require('./routes/chatRoutes')
// const Message = require('./models/messageModel');
// const User = require('./models/userModel');

// const io = new Server(server, {
//   cors: { origin: "*" }
// });
// global.io = io; 

// app.use(express.static(path.join(__dirname, 'frontend')));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend', 'chatWindow.html'));
// });

// app.use('/user',userRoute);
// app.use('/chat',chatRoutes);
// require('./models');

// const onlineUsers = {};
// io.on('connection', (socket) => {
//   console.log('User connected', socket.id);

//   socket.on("registerUser", async ({ email }) => {
//     const user = await User.findOne({ where: { email } });
//     if (!user) return;

//     onlineUsers[socket.id] = {
//     socketId: socket.id,
//     userId: user.id,
//     name: user.name, // temporary name
//     email: user.email   
//   };

//   io.emit("onlineUsers", Object.values(onlineUsers));
// });

//    socket.on("disconnect", () => {
//     delete onlineUsers[socket.id];
//     io.emit("onlineUsers", Object.values(onlineUsers));
//   });

//   socket.on('chatMessage', async(data) => {
//     console.log('user', socket.id, 'said:', data.message);

//  try {

//  const user = await User.findOne({where:{email:data.email}});
//  console.log('555555555',user);
 
//       if (!user) return;

//       const savedMessage = await Message.create({
//         message: data.message,
//          senderName:user.name,
//          userId:user.id,
//          recipientId: data.recipientUserId
//       });
//       console.log('Message saved to DB');
//         io.to(data.recipientSocketId).emit('chatMessage', {
//       socketId:socket.id,
//       message:savedMessage.message,
//       senderName:savedMessage.senderName
//     });
//     socket.emit('chatMessage', {
//   socketId: socket.id,
//   message: savedMessage.message,
//   senderName: "You"
// });

//     } catch (err) {
//       console.error('DB save error:', err);
//     }
//   });
// });

// db.sync({force:true})
// .then(()=>{
//   server.listen(3000, () => {
//   console.log('socket.io server running on port 3000');
// });
// })

const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());

const server = http.createServer(app);

const db = require('./util/db-connect');
const userRoute = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');

const Message = require('./models/messageModel');
const User = require('./models/userModel');

// ✅ ADD (group chat models + controller)
const GroupMessage = require('./models/groupMessageModel');
const { getGroupMessages } = require('./controller/groupController');

const io = new Server(server, {
  cors: { origin: "*" }
});
global.io = io;

app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'chatWindow.html'));
});

app.use('/user', userRoute);
app.use('/chat', chatRoutes);

// ✅ ADD (group messages API)
app.get("/groups/:groupId/messages", getGroupMessages);

require('./models');

const onlineUsers = {};

io.on('connection', (socket) => {
  console.log('User connected', socket.id);

  socket.on("registerUser", async ({ email }) => {
    const user = await User.findOne({ where: { email } });
    if (!user) return;

    onlineUsers[socket.id] = {
      socketId: socket.id,
      userId: user.id,
      name: user.name,
      email: user.email
    };

    io.emit("onlineUsers", Object.values(onlineUsers));
  });

  socket.on("disconnect", () => {
    delete onlineUsers[socket.id];
    io.emit("onlineUsers", Object.values(onlineUsers));
  });

  // ================= PERSONAL CHAT (UNCHANGED) =================
  socket.on('chatMessage', async (data) => {
    console.log('user', socket.id, 'said:', data.message);

    try {
      const user = await User.findOne({ where: { email: data.email } });
      if (!user) return;

      const savedMessage = await Message.create({
        message: data.message,
        senderName: user.name,
        userId: user.id,
        recipientId: data.recipientUserId
      });

      io.to(data.recipientSocketId).emit('chatMessage', {
        socketId: socket.id,
        message: savedMessage.message,
        senderName: savedMessage.senderName
      });

      socket.emit('chatMessage', {
        socketId: socket.id,
        message: savedMessage.message,
        senderName: "You"
      });

    } catch (err) {
      console.error('DB save error:', err);
    }
  });

  // ================= GROUP CHAT (ONLY ADDITION) =================
  socket.on("joinGroup", (groupId) => {
    socket.join(groupId);
    console.log(`Socket ${socket.id} joined group ${groupId}`);
  });

  socket.on("groupMessage", async ({ groupId, username, message }) => {
    if (!message) return;

    try {
          const user = await User.findOne({ where: { email: username } });
    if (!user) return;

      await GroupMessage.create({
        message,
      senderId: user.id,
      senderName: user.name,
      groupId
      });

      io.to(groupId).emit("groupMessage", {
        groupId,
        username: user.name,
        message
      });
    } catch (err) {
      console.error("Group message save error:", err);
    }
  });
});

// ⚠️ FOR DEVELOPMENT ONLY
db.sync({ force: true }).then(() => {
  server.listen(3000, () => {
    console.log('socket.io server running on port 3000');
  });
});
