import React, { useState } from 'react';
import { createUserMessage, createTeslaMessage } from './Messages.jsx';
import PromptBox from './PromptBox.jsx';
import ChatUI from './ChatUI.jsx';


const LandingPage = () => {
    const [messages, setMessages] = useState([]);  
    const [chatActive, setChatActive] = useState(false);

    console.log(" LandingPage is succesfully rendering ");

    // Handles user prompts and
    const handleUserPrompt = async (userPrompt) => {

        const UserMessage = createUserMessage(userPrompt);
        setMessages(prev => [...prev, UserMessage]);
        setChatActive(true);

        try {
            const response = await fetch('http://localhost:4000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    prompt: userPrompt,
                    conversationHistory: messages }),
            });

            const data = await response.json();
            const TeslaBotReply = createTeslaMessage(data.reply);
            setMessages(prev => [...prev, TeslaBotReply]);
            

        } catch (error) {
            console.error('Error communicating with server:', error);

            const errorMessage = createTeslaMessage("Sorry, I'm having trouble responding right now!");
            setMessages(prev => [...prev, errorMessage]);
    
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
        <div className="MainPage" style={{
            backgroundColor: '#ffffff',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
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

            // Once chat is active, we hide the above "Tesla-Head" element and show the ChatUI component
                
            )}
            {chatActive && (
                <ChatUI/>
            
            )}

            { /* The PromptBox is always shown at all times for both the intial prompt and follow-up prompts */ }

            
            <PromptBox onSubmit={handleUserPrompt} />

        </div>


    )

}

export default LandingPage;