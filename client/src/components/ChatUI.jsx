import React from 'react';
import MessageList from './MessageList.jsx';
 
const ChatUI = ({ messages }) => {
    return (
        <div className="chat-container">
            <div className="chat-header">
                <h3>Chat with Nikola Tesla</h3>
            </div>
            <div className="chat-body">
                <MessageList messages={messages} />
            </div>
        </div>
    );
};
 
export default ChatUI;