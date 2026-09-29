const messageModel = require("../models/messageModel");

const onlineUsers = new Map();

function registerChatSocket(io) {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // User joins chat
    socket.on("join_chat", (username) => {
      socket.username = username;

      onlineUsers.set(socket.id, username);

      console.log(`${username} joined the chat`);

      socket.broadcast.emit("user_joined", {
        username,
        message: `${username} joined the chat`,
      });

      io.emit("online_users", {
        count: onlineUsers.size,
        users: [...onlineUsers.values()],
      });
    });

    // Send message
    socket.on("send_message", (data) => {
      try {
        const { username, message } = data;

        if (!username || !message || !message.trim()) {
          socket.emit("message_error", {
            message: "Username and message are required",
          });

          return;
        }

        const savedMessage = messageModel.createMessage(
          username.trim(),
          message.trim()
        );

        io.emit("new_message", savedMessage);
      } catch (error) {
        console.error("Socket message error:", error);

        socket.emit("message_error", {
          message: "Failed to send message",
        });
      }
    });

    // Typing indicator
    socket.on("typing", (data) => {
      console.log(`${data.username} is typing...`);

      socket.broadcast.emit("user_typing", {
        username: data.username,
      });
    });

    socket.on("stop_typing", (data) => {
      console.log(`${data.username} stopped typing`);

      socket.broadcast.emit("user_stop_typing", {
        username: data.username,
      });
    });

    // User disconnects
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      const username = onlineUsers.get(socket.id);

      onlineUsers.delete(socket.id);

      if (username) {
        socket.broadcast.emit("user_left", {
          username,
          message: `${username} left the chat`,
        });
      }

      io.emit("online_users", {
        count: onlineUsers.size,
        users: [...onlineUsers.values()],
      });
    });
  });
}

module.exports = registerChatSocket;