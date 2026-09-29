import { useEffect, useState } from "react";
import { socket } from "./services/socket";
import { getMessages } from "./services/api";

import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";

import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);

  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState("");

  const [typingUser, setTypingUser] = useState("");
  const [onlineUsers, setOnlineUsers] = useState(0);

  // Load previous messages from REST API
  useEffect(() => {
    async function loadMessages() {
      try {
        const response = await getMessages();

        if (response.success) {
          setMessages(response.data);
        }
      } catch (error) {
        console.error("Failed to load messages:", error);
        setError("Unable to load chat history.");
      }
    }

    loadMessages();
  }, []);

  // Socket.io connection
  useEffect(() => {
    if (!joined) {
      return;
    }

    socket.connect();

    const handleConnect = () => {
      setConnected(true);
      setError("");

      socket.emit("join_chat", username);
    };

    const handleDisconnect = () => {
      setConnected(false);
    };

    const handleNewMessage = (message) => {
      setMessages((previousMessages) => {
        const exists = previousMessages.some(
          (item) => item.id === message.id
        );

        if (exists) {
          return previousMessages;
        }

        return [...previousMessages, message];
      });
    };

    const handleMessageError = (data) => {
      setError(data.message);
    };

    const handleUserTyping = (data) => {
      setTypingUser(data.username);
    };

    const handleUserStopTyping = () => {
      setTypingUser("");
    };

    const handleOnlineUsers = (data) => {
      setOnlineUsers(data.count);
    };

    const handleUserJoined = () => {
      // Join event handled by server.
    };

    const handleUserLeft = () => {
      // Leave event handled by server.
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("new_message", handleNewMessage);
    socket.on("message_error", handleMessageError);
    socket.on("user_typing", handleUserTyping);
    socket.on("user_stop_typing", handleUserStopTyping);
    socket.on("online_users", handleOnlineUsers);
    socket.on("user_joined", handleUserJoined);
    socket.on("user_left", handleUserLeft);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("new_message", handleNewMessage);
      socket.off("message_error", handleMessageError);
      socket.off("user_typing", handleUserTyping);
      socket.off("user_stop_typing", handleUserStopTyping);
      socket.off("online_users", handleOnlineUsers);
      socket.off("user_joined", handleUserJoined);
      socket.off("user_left", handleUserLeft);

      socket.disconnect();
    };
  }, [joined, username]);

  // Join chat
  const handleJoin = (event) => {
    event.preventDefault();

    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      setError("Please enter your username.");
      return;
    }

    if (trimmedUsername.length < 2) {
      setError("Username must contain at least 2 characters.");
      return;
    }

    setUsername(trimmedUsername);
    setJoined(true);
    setError("");
  };

  // Send message
  const handleSendMessage = (message) => {
    if (!connected) {
      setError("You are not connected to the chat server.");
      return;
    }

    socket.emit("send_message", {
      username,
      message,
    });
  };

  // Login screen
  if (!joined) {
    return (
      <div className="app-container">
        <div className="login-card">
          <div className="logo">💬</div>

          <h1>Real-Time Chat</h1>

          <p>
            Enter your username to join the conversation.
          </p>

          <form onSubmit={handleJoin}>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              maxLength={30}
              autoFocus
            />

            <button type="submit">
              Join Chat
            </button>
          </form>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Chat screen
  return (
    <div className="app-container">
      <div className="chat-container">

        {/* Header */}
        <header className="chat-header">
          <div className="chat-title">
            <div className="chat-avatar">
              💬
            </div>

            <div>
              <h1>Real-Time Chat</h1>

              <div className="connection-info">
                <span
                  className={
                    connected
                      ? "status online"
                      : "status offline"
                  }
                >
                  <span className="status-dot"></span>

                  {connected
                    ? "Connected"
                    : "Disconnected"}
                </span>

                {connected && (
                  <span className="online-count">
                    {onlineUsers}{" "}
                    {onlineUsers === 1
                      ? "user"
                      : "users"}{" "}
                    online
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="user-info">
            <span className="user-label">
              You
            </span>

            <strong>
              {username}
            </strong>
          </div>
        </header>

        {/* Error */}
        {error && (
          <div className="error-banner">
            {error}
          </div>
        )}

        {/* Messages */}
        <MessageList
          messages={messages}
          currentUsername={username}
        />

        {/* Typing indicator */}
        {typingUser && typingUser !== username && (
          <div className="typing-indicator">
            {typingUser} is typing...
          </div>
        )}

        {/* Message input */}
        <MessageInput
          onSendMessage={handleSendMessage}
          disabled={!connected}
          username={username}
        />

      </div>
    </div>
  );
}

export default App;