const User = require('./userModel');
const Message = require('./messageModel');

User.hasMany(Message, { foreignKey: 'userId' });
Message.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Message };
