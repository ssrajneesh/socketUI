import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import MessageList from './MessageList';
import './chatStyles.css';
import SEND from './send.png';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const socket = io('http://localhost:4000', {
  query: {
    userEmail: localStorage.getItem('email')
  }
});

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedEmail, setSelectedEmail] = useState(localStorage.getItem('email'));
  const navigate = useNavigate();

  const [showLogout, setShowLogout] = useState(false);

  const email = localStorage.getItem('email');

  const sendMessage = () => {
    const userDeviceId = localStorage.getItem('email');
    const newMessage = { text: message, type: 'sent', userDeviceId, selectedEmail };
    setMessages([...messages, newMessage]);
    socket.emit('event', { message, userDeviceId, selectedEmail });
    setMessage('');
  };

  useEffect(() => {
    socket.on('emit', ({ message, userDeviceId, selectedEmail }) => {
      setMessages([...messages, { text: message, type: 'received', userDeviceId, selectedEmail }]);
    });
  }, [messages]);

  const mail = localStorage.getItem('email');

  const handleLogout = async () => {
    const response = await fetch(`http://localhost:3002/logout?email=${mail}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    localStorage.clear();
  };

  const logout = () => {
    navigate('/login');
    handleLogout();
  };

  const emailOptions = [
    { label: 'naman@mail.in', value: 'naman@mail.in' },
    { label: 'raj@mail.in', value: 'raj@mail.in' },
    { label: 'pankaj@mail.in', value: 'pankaj@mail.in' },
  ];

  // Handle email selection change
  const handleEmailChange = (selectedOption) => {
    setSelectedEmail(selectedOption.value);
  };

  return (
    <>
      <h2 onClick={() => setShowLogout(!showLogout)} style={{ marginRight: '10px' }}>
        {email}
      </h2>
      {showLogout ? <button onClick={logout} style={{ marginRight: '10px' }}>Logout</button> : null}
      <Select
        options={emailOptions}
        value={{ label: selectedEmail, value: selectedEmail }}
        onChange={handleEmailChange}
        styles={{
          control: (provided) => ({
            ...provided,
            width: '440px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }),
        }}
      />
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
    </>
  );
}

export default Chat;