import React, { useState } from 'react';
import PromptBox from './PromptBox.jsx';
import ChatUI from './ChatUI.jsx';


const LandingPage = () => {

    const [userInput, setUserInput] = useState('');
    const [chatActive, setChatActive] = useState(false);

    console.log(" LandingPage is succsefully rendering ");
    
          
    
    const updateInputChange = (inp, messageTimes) => {
        
        if (!userInput.trim()) return;

        const UserPrompt = { role: 'User', content: inp };



        setUserInput(inp);
        setChatActive(true);
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


        </div>


    )
}

export default LandingPage;