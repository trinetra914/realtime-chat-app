const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const messageRoutes = require("./routes/messageRoutes");
const registerChatSocket = require("./socket/chatSocket");

const app = express();

const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// REST API routes
app.use("/api/messages", messageRoutes);

// Create HTTP server
const server = http.createServer(app);

// Create Socket.io server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Register Socket.io events
registerChatSocket(io);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Chat server is running"
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});