const express = require("express");
const router = express.Router();

// CREATE GROUP
router.post("/create", (req, res) => {
  res.json({ message: "Group created" });
});

// GET ALL GROUPS (optional)
router.get("/", (req, res) => {
  res.json({ message: "All groups" });
});

module.exports = router;
