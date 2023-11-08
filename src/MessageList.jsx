// MessageList.js
import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <ul>
      {messages.map((message, index) => (
        <li key={index} className={message.type}>
          <div className="message-container">
            {message.text}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MessageList;