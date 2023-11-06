// Chat.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import MessageList from './MessageList';
import './chatStyles.css'; // Import the CSS file
import SEND from './send.png';

const socket = io('http://localhost:4000');

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    const newMessage = { text: message, type: 'sent' };
    setMessages([...messages, newMessage]);
    socket.emit('event', message);
    setMessage('');
  };

  useEffect(() => {
    socket.on('emit', (message) => {
      setMessages([...messages, { text: message, type: 'received' }]);
    });
  }, [messages]);

  return (
    <div className="chat-container">
      <MessageList messages={messages} />
      <div className="message-input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="message-input"
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="send-button">
          <img src={SEND} alt="Send" className="send-icon" />
        </button>
      </div>
    </div>
  );
}

export default Chat;
