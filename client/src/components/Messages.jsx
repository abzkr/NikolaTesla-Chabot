import React from "react";

function Message({ message }) {
    const isUser = message.sender === 'User';
    
    // We handle the different styling for user and Tesla messages below by using inline JS to either display message on the left or right

    return (
        <div style={{
            display: 'flex',
            justifyContent: isUser ? 'flex-end' : 'flex-start',
            marginBottom: '15px',
            padding: '0 10px'
        }}>
            <div style={{
                maxWidth: '70%',
                padding: '12px 16px',
                borderRadius: '12px',
                backgroundColor: isUser ? '#3fb1c5ff' : '#f0f0f0',
                color: isUser ? 'white' : 'black',
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}>
                <p style={{ margin: 0, marginBottom: '5px' }}>
                    {message.text}
                </p>
                <small style={{ 
                    fontSize: '11px', 
                    opacity: 0.7 
                }}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                </small>
            </div>
        </div>
    );
}

export default Message;



export const createUserMessage = (text) => ({
    id: Date.now(),
    text: text,
    sender: 'User',
    timestamp: Date.now(),
});

export const createTeslaMessage = (text) => ({
    id: Date.now() + 1,
    text: text,
    sender: 'Nikola Tesla',
    timestamp: Date.now(),
});