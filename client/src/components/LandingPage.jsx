import React, { useState } from 'react';
import { createUserMessage, createTeslaMessage } from './Message.jsx';
import PromptBox from './PromptBox.jsx';
import ChatUI from './ChatUI.jsx';


const LandingPage = () => {
    const [messages, setMessages] = useState([]);  
    const [chatActive, setChatActive] = useState(false);



    // Change conversation history to messages once you have succesfully connected to the backend

    console.log(" LandingPage is succesfully rendering ");

    // Handles user prompts and
    const handleUserPrompt = async (userPrompt) => {

        const UserMessage = createUserMessage(userPrompt);
        setMessages(prev => [...prev, UserMessage]);
        setChatActive(true);

        // Build the conversation history including the just-created user message
        const conversationHistory = [...messages, UserMessage];

        try {
            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: userPrompt, conversationHistory }),
            });

            // Initial server testing - We had a similar on landingpage - Here would be more appropriate
            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }

            const data = await response.json();
            const TeslaBotReply = createTeslaMessage(data.reply || "(no reply)");
            setMessages(prev => [...prev, TeslaBotReply]);

        } catch (error) {
            console.error('Error communicating with server:', error);
            const errorMessage = createTeslaMessage("Sorry, I'm having trouble responding right now!");
            setMessages(prev => [...prev, errorMessage]);
        }
    }; 
    
   
    // TODO: suggested questions helper (unused)
    
    return (
        <div className="MainPage" style={{
            backgroundColor: '#ffffff',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: chatActive ? 'flex-start' : 'center',
            alignItems: 'center',
            padding: '20px',
            paddingTop: chatActive ? '80px' : '20px'
        }}>

            { /* Header with Nikola Tesla logo 
                If chat is active, logo moves to the top left*/ }

            
            <header>
                <img src="nikola_logo.png" 
                alt="Nikola Tesla Logo" 
                style={{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    right: '0',
                    height: '60px', 
                    padding: '15px 20px',
                    zIndex: '1000',
                    justifyContent: chatActive ? 'flex-start' : 'center',
                    display: 'flex',
                    alignItems: 'center',
            }}
                />
            </header>

            { /* If the chat is not active, we show the "Tesla-Head" element with intro text */ }

            {!chatActive && (
            <>
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
            </>
            )}

            { /* When chat is active show the ChatUI and position the PromptBox directly under it */ }
            {chatActive ? (
                <div style={{
                    width: '700px',
                    maxWidth: '95%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    gap: '12px',
                    marginTop: '20px'
                }}>
                    <ChatUI messages={messages} />
                    <PromptBox onSubmit={handleUserPrompt} />
                </div>
            ) : (
                /* When chat is not active, keep the PromptBox below the intro */
                <div style={{ width: '100%', marginTop: '20px' }}>
                    <PromptBox onSubmit={handleUserPrompt} />
                </div>
            )}

        </div>


    )

}

export default LandingPage;