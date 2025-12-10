import { useState, useEffect } from 'react';
import './components/LandingPage.jsx';
import './App.css';
import LandingPage from './components/LandingPage.jsx';
import PromptBox from './components/PromptBox.jsx';


function App() {
  const [status, setStatus] = useState('');


  useEffect(() => {
    // Test API connection
    fetch('http://localhost:5000/api/health')
      .then(res => res.json())
      .then(data => setStatus(data.status))
      .catch(err => setStatus('Error connecting to server'));
  }, []);



  return (
    <div className="App">
      <LandingPage />
      <PromptBox />
      <h1>Nikola Tesla Chatbot</h1>
      <p>Server status: {status}</p>
    </div>
  );
}

export default App;