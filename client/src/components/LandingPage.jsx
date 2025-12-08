import React, { useState } from 'react';
import { createUserMessage, createTeslaMessage } from './Messages.jsx';
import PromptBox from './PromptBox.jsx';
import ChatUI from './ChatUI.jsx';


const LandingPage = () => {
    const [messages, setMessages] = useState([]);  
    const [chatActive, setChatActive] = useState(false);

    console.log(" LandingPage is succsefully rendering ");

    // Handles user prompts and
    const handleUserPrompt = async (userPrompt) => {

        const UserMessage = { message: userPrompt, sender: 'User' };
        
        setMessages(prev => [...prev, UserMessage]);
        setChatActive(true);

        try {
            
            const response = await fetch('http://localhost:4000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: userPrompt }),
                message: UserMessage,
                conversationhistory: messages
            });

            const data = await response.json();

            const TeslaBotReply = {message: data.reply, sender: 'Nikola Tesla'};

            setMessages(prev => [...prev, TeslaBotReply]);
            

        } catch (error) {
            console.error('Error communicating with server:', error);
        }
    }; 
    
    const renderChatUI = () => {
        if (chatActive) {
            return <ChatUI />;
        }
    };

    const suggestedQuestions = () => {
        const questions = [
            "What inspired your work on alternating current?",
            "Can you explain the Tesla coil and its applications?",
            "How did you come up with the idea for the radio?",        
        ];

    }
    
    return (
        <div style={{
            backgroundColor: '#ffffff',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
        }}>

            <header>
                <img src="nikola_logo.png" 
                alt="Nikola Tesla Logo" 
                style={{
                height: '75px', 
                borderRadius: '10px', 
                marginBottom: '20px' }}
                />
            </header>


            <img src="/nikola_head.png" 
                alt="Nikola Tesla Chatbot" 
                style={{ 
                position : 'relative',
                height: '200px', 
                width: '200px' }}
            />

            <h2>
              Talk to Nikola Tesla
            </h2>
            <p>  
                Ask me about my inventions, experiments, and vision for the future of electricity
            </p>

            <div>
                <PromptBox onSubmit={handleUserPrompt} />
                <ChatUI />
            </div>


        </div>


    )

}

export default LandingPage;