async function processPrompt(prompt, conversationHistory = [], persona) {
    // Normalize prompt for matching
    const lowerPrompt = prompt.toLowerCase();

    // Check each topic in persona
    for (const [topic, keywords] of Object.entries(persona.topics)) {
        if (keywords.some(word => lowerPrompt.includes(word))) {
            const responses = persona.responses[topic] || persona.responses.default;
            return {
                reply: pickWeightedResponse(responses),
                updatedConversationHistory: [
                    ...conversationHistory,
                    { role: 'user', content: prompt },
                    { role: 'assistant', content: pickWeightedResponse(responses) },
                ],
            };
        }
    }

    // If no topic matches, use default
    
    // Changes made here so that pickWeightedResponse is only called once, before it was being called twice
    // And this was resulting in 2 different responses being generated for the same prompt

    const defaultResponses = persona.responses.default;
    const chosenResponse = pickWeightedResponse(defaultResponses);
    return {
        reply: chosenResponse,
        updatedConversationHistory: [
            ...conversationHistory,
            { role: 'user', content: prompt },
            { role: 'assistant', content: chosenResponse },
        ],
    };
}

// Utility: pick a response based on probability
function pickWeightedResponse(responses) {
    const total = responses.reduce((sum, r) => sum + r.probability, 0);
    const rand = Math.random() * total;
    let cumulative = 0;
    for (const r of responses) {
        cumulative += r.probability;
        if (rand <= cumulative) return r.text;
    }
    return responses[0].text; // fallback
}


module.exports = { processPrompt };
