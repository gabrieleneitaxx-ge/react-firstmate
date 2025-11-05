import React, { useState } from 'react';
import './ChatDemo.css'; 

const initialMessages = [
    { 
        id: 1, 
        text: "Hi! I'm FirstMate, your personal assistant for personal assistants. How can I help you organize your day?", 
        sender: 'bot' 
    }
];

const ChatDemo = () => {
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim() === '') return;

        // 1. Add User Message
        const newUserMessage = {
            id: Date.now(),
            text: input,
            sender: 'user',
        };
        const updatedMessages = [...messages, newUserMessage];
        
        // 2. Simulate Bot Response (Predefined Demo Response)
        const botResponse = {
            id: Date.now() + 1,
            text: `(Demo) I've noted your request: "${input}". As your assistant, I can confirm that workflow automation is active. How about a summary of your priority tasks?`,
            sender: 'bot',
        };
        
        // Use a timeout to simulate a realistic delay for the bot to "think"
        setTimeout(() => {
            setMessages([...updatedMessages, botResponse]);
            // Optional: Scroll to the bottom of the chat window
            document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
        }, 800);

        // 3. Clear the input field
        setInput('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <section id="chat" className="chat-section">
            <div className="container">
                <div className="chat-container">
                    <div className="chat-header">
                        <h2>Chat With FirstMate 🤖</h2>
                    </div>
                    
                    {/* Message Display Area */}
                    <div className="chat-messages" id="chatMessages">
                        {messages.map((message) => (
                            <div 
                                key={message.id} 
                                className={`message ${message.sender}`}
                            >
                                {message.text}
                            </div>
                        ))}
                    </div>
                    
                    {/* Input and Send Button */}
                    <div className="chat-input">
                        <input
                            type="text"
                            id="chatInput"
                            placeholder="Ask me anything..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button onClick={handleSend}>Send</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChatDemo;