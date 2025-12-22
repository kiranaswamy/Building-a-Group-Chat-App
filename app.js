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
// const chatRoutes = require('./routes/chatRoutes');

// const Message = require('./models/messageModel');
// const User = require('./models/userModel');
// const Group = require('./models/groupModel');
// const GroupMessage = require('./models/groupMessageModel');

// const io = new Server(server, {
//   cors: { origin: "*" }
// });
// global.io = io;

// app.use(express.static(path.join(__dirname, 'frontend')));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend', 'chatWindow.html'));
// });

// app.use('/user', userRoute);
// app.use('/chat', chatRoutes);
// app.use("/suggestions", require("./routes/suggestionRoutes"));


// require('./models');

// const onlineUsers = {};

// /* ================= SOCKET CONNECTION ================= */
// io.on('connection', (socket) => {
//   console.log('User connected', socket.id);

//   /* ---------- REGISTER USER ---------- */
//   socket.on("registerUser", async ({ email }) => {
//     const user = await User.findOne({ where: { email } });
//     if (!user) return;

//     onlineUsers[socket.id] = {
//       socketId: socket.id,
//       userId: user.id,
//       name: user.name,
//       email: user.email
//     };

//     io.emit("onlineUsers", Object.values(onlineUsers));
//   });

//   socket.on("disconnect", () => {
//     delete onlineUsers[socket.id];
//     io.emit("onlineUsers", Object.values(onlineUsers));
//   });

//   /* ================= PERSONAL CHAT ================= */
//   socket.on('chatMessage', async (data) => {
//     try {
//       const user = await User.findOne({ where: { email: data.email } });
//       if (!user) return;

//       const savedMessage = await Message.create({
//         message: data.message,
//         senderName: user.name,
//         userId: user.id,
//         recipientId: data.recipientUserId
//       });

//       io.to(data.recipientSocketId).emit('chatMessage', {
//         socketId: socket.id,
//         message: savedMessage.message,
//         senderName: savedMessage.senderName
//       });

//       socket.emit('chatMessage', {
//         socketId: socket.id,
//         message: savedMessage.message,
//         senderName: "You"
//       });

//     } catch (err) {
//       console.error('Personal chat DB error:', err);
//     }
//   });

//   /* ================= GROUP CHAT (AUTO GROUP) ================= */
//   socket.on("groupMessage", async ({ message, username }) => {
//     if (!message) return;

//     try {
//       // find user
//       const user = await User.findOne({ where: { email: username } });
//       if (!user) return;

//       // auto-create ONE default group
//       let group = await Group.findOne({ where: { name: "DEFAULT_GROUP" } });
//       if (!group) {
//         group = await Group.create({ name: "DEFAULT_GROUP" });
//       }

//       // save message
//       const savedMessage = await GroupMessage.create({
//         message,
//         senderId: user.id,
//         senderName: user.name,
//         groupId: group.id
//       });

//       // broadcast to all
//       io.emit("groupMessage", savedMessage);

//     } catch (err) {
//       console.error("Group chat DB error:", err);
//     }
//   });
// });

// /* ================= START SERVER ================= */
// db.sync({force:true}).then(() => {
//   server.listen(3000, () => {
//     console.log('socket.io server running on port 3000');
//   });
// });

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
const Group = require('./models/groupModel');
const GroupMessage = require('./models/groupMessageModel');

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
app.use("/suggestions", require("./routes/suggestionRoutes"));

require('./models');

const onlineUsers = {};

/* ================= SOCKET CONNECTION ================= */
io.on('connection', (socket) => {
  console.log('User connected', socket.id);

  /* ---------- REGISTER USER ---------- */
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

  /* ================= PERSONAL CHAT ================= */
  socket.on('chatMessage', async (data) => {
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
      console.error('Personal chat DB error:', err);
    }
  });

  /* ================= GROUP CHAT (AUTO GROUP) ================= */
  socket.on("groupMessage", async ({ message, username }) => {
    if (!message) return;

    try {
      const user = await User.findOne({ where: { email: username } });
      if (!user) return;

      let group = await Group.findOne({ where: { name: "DEFAULT_GROUP" } });
      if (!group) {
        group = await Group.create({ name: "DEFAULT_GROUP" });
      }

      const savedMessage = await GroupMessage.create({
        message,
        senderId: user.id,
        senderName: user.name,
        groupId: group.id
      });

      io.emit("groupMessage", savedMessage);

    } catch (err) {
      console.error("Group chat DB error:", err);
    }
  });
});

/* ================= START SERVER ================= */
db.sync().then(() => {
  server.listen(3000, () => {
    console.log('socket.io server running on port 3000');
  });
});
