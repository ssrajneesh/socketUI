import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import MessageList from './MessageList';
import './chatStyles.css'; // Import the CSS file
import SEND from './send.png';
// import { Navigate } from 'react-router';
import { useNavigate } from 'react-router-dom';


const socket = io('http://localhost:4000');

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  const[showLogout, setShowLogout] = useState(false)

  const email = localStorage.getItem("email")
  console.log(email);

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


   console.log(localStorage.getItem('email'))
  
  const mail = localStorage.getItem('email')
 const  handlelogout = async () => {
    // Perform the login request to your API with the formData
    const response = await fetch(`http://localhost:3002/logout?email=${mail}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  localStorage.clear();
}


  const logout=()=>{
    navigate('/login');
    handlelogout();

}

  return (
    <>
    <h2 onClick={() => setShowLogout(!showLogout)} style={{marginLeft:"670px"}}>{email}</h2>
    {
      showLogout? <button onClick={logout} style={{marginLeft:"670px"}}>Logout</button>: null
    }
   
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
