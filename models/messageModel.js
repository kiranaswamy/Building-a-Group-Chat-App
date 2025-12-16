const { DataTypes } = require('sequelize');
const sequelize = require('../util/db-connect');

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {                     // ✅ REQUIRED
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Message;
