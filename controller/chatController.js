let chats = []; // in-memory storage

exports.sendMessage = (req, res) => {
  const { sender, message } = req.body;

  if (!sender || !message) {
    return res.status(400).json({ message: 'Sender and message required' });
  }

  const chat = {
    id: Date.now(),
    sender,
    message,
    time: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })
  };

  chats.push(chat);
  res.status(201).json(chat);
};

exports.getMessages = (req, res) => {
  res.status(200).json(chats);
};
