// MessageList.js
import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <ul>
      {messages.map((message, index) => (
        <li key={index} className={message.type}>
          {message.text}
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
