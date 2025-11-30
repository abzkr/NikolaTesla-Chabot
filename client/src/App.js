import { useState, useEffect } from 'react';
import './App.css';

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
      <h1>Nikola Tesla Chatbot</h1>
      <p>Server status: {status}</p>
    </div>
  );
}

export default App;