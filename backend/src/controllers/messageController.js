const messageModel = require("../models/messageModel");

function sendMessage(req, res) {
  try {
    const { username, message } = req.body;

    if (!username || !message) {
      return res.status(400).json({
        success: false,
        message: "Username and message are required"
      });
    }

    const newMessage = messageModel.createMessage(
      username.trim(),
      message.trim()
    );

    res.status(201).json({
      success: true,
      data: newMessage
    });
  } catch (error) {
    console.error("Send message error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send message"
    });
  }
}

function getMessages(req, res) {
  try {
    const messages = messageModel.getMessages();

    res.json({
      success: true,
      data: messages
    });
  } catch (error) {
    console.error("Get messages error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch messages"
    });
  }
}

module.exports = {
  sendMessage,
  getMessages
};