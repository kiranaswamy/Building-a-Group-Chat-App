const Group = require("../models/groupModel");
const GroupMessage = require("../models/groupMessageModel");
const User = require("../models/userModel");

exports.createGroup = async (req, res) => {
  try {
    const { name } = req.body;
    const group = await Group.create({ name });
    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ error: "Group creation failed" });
  }
};

exports.getGroupMessages = async (req, res) => {
  try {
    const { groupId } = req.params;

    const messages = await GroupMessage.findAll({
      where: { groupId },
      order: [["createdAt", "ASC"]]
    });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
