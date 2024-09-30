import React, { useState } from 'react';
import axios from 'axios';
import './chatBot.module.scss';

const ChatBot = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const newChat = [...chat, { type: 'user', text: message }];
    setChat(newChat);
    
    try {
      const response = await axios.post('http://localhost:5000/api/chatbot', { message });
      setChat([...newChat, { type: 'bot', text: response.data.reply }]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
    
    setMessage('');
  };

  return (
    <div className="chatbot">
      <div className="chat-window">
        {chat.map((entry, index) => (
          <div key={index} className={`chat-entry ${entry.type}`}>
            {entry.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBot;
