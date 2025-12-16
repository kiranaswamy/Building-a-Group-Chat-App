const express = require('express');
const app = express();
const cors = require("cors");


const http = require("http");
const WebSocket = require("ws");

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
global.wss = wss;


const db = require('./util/db-connect');

const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');

require('./models');

app.use(express.json());
app.use(cors());       

app.get('/', (req, res) => {
  res.send('server is created');
});

app.use('/user', userRoutes);
app.use('/chat', chatRoutes);


wss.on('connection', () => {
  console.log('WebSocket client connected');
});


db.sync({ force: true })
.then(() => {
  server.listen(3000, () => {
    console.log('server is running with websocket');
  });
})
.catch((err) => {
  console.log(err);
});
