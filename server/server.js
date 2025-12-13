const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { processPrompt } = require('./engine/scriptingEngine');
const { teslaPersona } = require('./persona/teslapersona');

const app = express();
const PORT = 5000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

// API endpoint to handle chat messages - Basic error handling to make sure the prompt is provided, 
// e.g Just incase

app.post('/api/chat', async (req, res) => {
    try {
        const { prompt, conversationHistory } = req.body;

        if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

        const response = await processPrompt(prompt, conversationHistory, teslaPersona);

        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
