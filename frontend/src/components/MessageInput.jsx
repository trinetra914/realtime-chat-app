import { useState } from "react";
import { socket } from "../services/socket";

function MessageInput({ onSendMessage, disabled, username }) {
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;

    setMessage(value);

    if (value.trim() && !disabled) {
      socket.emit("typing", {
        username,
      });
    } else {
      socket.emit("stop_typing", {
        username,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || disabled) {
      return;
    }

    onSendMessage(trimmedMessage);

    setMessage("");

    socket.emit("stop_typing", {
      username,
    });
  };

  return (
    <form
      className="message-input-container"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={message}
        onChange={handleChange}
        placeholder="Type your message..."
        disabled={disabled}
        maxLength={500}
      />

      <button
        type="submit"
        disabled={disabled || !message.trim()}
      >
        Send
      </button>
    </form>
  );
}

export default MessageInput;