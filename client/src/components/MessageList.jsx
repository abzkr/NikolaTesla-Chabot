import React, { useEffect, useRef } from 'react';
import Message from './Message';  // Changed: import the component
import './MessageList.css';

const MessageList = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (messages && messages.length > 0) {
      scrollToBottom();
    }
  }, [messages.length]);

  return (
    <div
      className="message-list"
      role="log"
      aria-live="polite"
      aria-label="Nikola Tesla chat messages"
      style={{
        height: '400px',
        overflowY: 'auto',
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '20px',
        backgroundColor: '#fafafa',
        marginBottom: '20px'
      }}
    >      
      {messages.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#999' }}>
          Ask Nikola Tesla your first question ⚡   
        </p>
      ) : (
        messages.map((message) => (
          <Message key={message.id} message={message} />  // Changed: Message not Messages
        ))
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;