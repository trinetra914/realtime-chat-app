const express = require("express");

const {
  sendMessage,
  getMessages
} = require("../controllers/messageController");

const router = express.Router();

// Send message
router.post("/", sendMessage);

// Get chat history
router.get("/", getMessages);

module.exports = router;