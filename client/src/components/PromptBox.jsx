import React, {useState} from "react";


// Uses a callback function "Onsubmit" to send the prompt input back to parent component

function PromptBox({ onSubmit }) {
    const [inputVal, setInputVal] = useState("");

    function sendPrompt(e){
        e.preventDefault();
        if (inputVal.trim() !== ""){
            onSubmit(inputVal);
            setInputVal("");
        }

    }
    
    return(
        <form onSubmit={sendPrompt} >
            <input value={inputVal} 
            onChange={(e) => setInputVal(e.target.value)} 
            placeholder="Ask me anything..."
            />

            <button type="submit">Send</button>
        </form>

    );

}


export default PromptBox;