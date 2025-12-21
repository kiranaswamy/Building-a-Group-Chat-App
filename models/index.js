const User = require('./userModel');
const Message = require('./messageModel');
const Group = require("./groupModel");
const GroupMessage = require("./groupMessageModel");

// // A user can send many messages
User.hasMany(Message, { foreignKey: 'userId', as: 'sentMessages' });
Message.belongsTo(User, { foreignKey: 'userId', as: 'sender' });

Group.hasMany(GroupMessage, { foreignKey: "groupId" });
GroupMessage.belongsTo(Group, { foreignKey: "groupId" });

User.hasMany(GroupMessage, { foreignKey: "senderId" });
GroupMessage.belongsTo(User, { foreignKey: "senderId" });

// Each message belongs to a sender
// Message.belongsTo(User, { foreignKey: 'userId', as: 'sender' });

// // Each message belongs to a recipient
// Message.belongsTo(User, { foreignKey: 'recipientId', as: 'recipient' });

module.exports = { User, Message,Group,GroupMessage };


// const User = require('./userModel');
// const Message = require('./messageModel');

// User.hasMany(Message, { foreignKey: 'userId' });
// Message.belongsTo(User, { foreignKey: 'userId' });

// module.exports = { User, Message };
