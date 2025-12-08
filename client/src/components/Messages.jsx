import React from "react";


export const createUserMessage = (text) => ({
    id: Date.now(),
    text: text,
    sender: 'User',
    timestamp: Date.now(),
});

export const createTeslaMessage = (text) => ({
    id: Date.now() + 1,
    text: text,
    sender: 'Nikola Tesla',
    timestamp: Date.now(),
});