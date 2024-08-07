import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    setMessages(storedMessages);
  }, []);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (newMessage.trim() !== '') {
      setMessages([...messages, { text: newMessage, timestamp: new Date() }]);
      setNewMessage('');
    }
  };

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="chat-container">
      <FontAwesomeIcon
        icon={faComments}
        className="chat-icon"
        onClick={handleChatToggle}
      />
      {isChatOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>Chat with Us</h3>
            <FontAwesomeIcon
              icon={faTimes}
              className="close-icon"
              onClick={handleChatToggle}
            />
          </div>
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className="chat-message">
                <span>{message.text}</span>
                <small>{new Date(message.timestamp).toLocaleTimeString()}</small>
              </div>
            ))}
          </div>
          <form className="chat-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
