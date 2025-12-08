import React, {useState} from "react";


// Uses a callback function "Onsubmit" to send the prompt input back to parent component

function PromptBox({ onSubmit }) {
    const [inputVal, setInputVal] = useState("");

    function sendPrompt(prompt){
        prompt.preventDefault();
        if (inputVal.trim() !== ""){
            onSubmit(inputVal);
            setInputVal("");
        }

    }
    
    return(
        <form onsubmit={sendPrompt} >
            <input value={inputVal} 
            onChange={(prompt) => setInputVal(prompt.target.value)} 
            placeholder="Ask me anything..."
            />

            <button type="submit">Send</button>
        </form>

    );

}


export default PromptBox;