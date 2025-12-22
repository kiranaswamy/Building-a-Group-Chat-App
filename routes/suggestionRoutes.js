const express = require("express");
const router = express.Router();
const { predictText } = require("../controller/suggestionController");
const { smartReplies } = require("../controller/suggestionController");

router.post("/replies", smartReplies);
router.post("/predict", predictText);

module.exports = router;
