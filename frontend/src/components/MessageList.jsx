import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

function MessageList({ messages, currentUsername }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="empty-chat">
        <div className="empty-icon">💬</div>
        <h3>No messages yet</h3>
        <p>Start the conversation!</p>
      </div>
    );
  }

  return (
    <div className="message-list">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          currentUsername={currentUsername}
        />
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;