const { DataTypes } = require('sequelize');
const sequelize = require('../util/db-connect');

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
 recipientId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
    userId: {                      // 🔗 association
    type: DataTypes.INTEGER,
    allowNull: false
  },
  senderName: {              // ✅ for UI display
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Message;
