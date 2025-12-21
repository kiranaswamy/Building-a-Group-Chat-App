const { DataTypes } = require("sequelize");
const sequelize = require("../util/db-connect");

const GroupMessage = sequelize.define("GroupMessage", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  senderName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  groupId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = GroupMessage;
