import React, { useEffect, useRef } from 'react';
import Messages from './Messages';
import './MessageList.css';

// This component renders the list of chat messages
const MessageList = ({ messages }) => {
  const messagesEndRef = useRef(null);

  // will scroll to bottom of list automatically
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll whenever the number of messages changes
  useEffect(() => {
    if (messages && messages.length > 0) {
      scrollToBottom();
    }
  }, [messages.length]);

  return (
    <div
      className="message-list" //connects to CSS styling
      role="log" // scrollable box for chat messages
      aria-live="polite" // when content updates, screen readers are notified politely
      aria-label="Nikola Tesla chat messages" // descriptive label for screen readers
    >      
      {messages.length === 0 ? (
        <p className="message-list__empty">
          Ask Nikola Tesla your first question ⚡   
        </p> // when no messages show this prompt
      ) : (
        messages.map((message) => (
          <Messages key={message.id} message={message} />  // render each message
        ))
      )}


      {/* Invisible element at the end to scroll into view */}
      <div ref={messagesEndRef} />
    </div>
  );
};

// Export the MessageList component as the default export
export default MessageList;
