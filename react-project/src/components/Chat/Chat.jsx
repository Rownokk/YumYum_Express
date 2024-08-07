import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    setMessages(storedMessages);
  }, []);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (newMessage.trim() !== '') {
      setMessages([...messages, { text: newMessage, timestamp: new Date(), user: 'user' }]);
      setNewMessage('');
      setIsTyping(false);
    }
  };

  const handleTyping = (event) => {
    setNewMessage(event.target.value);
    if (event.target.value.trim() === '') {
      setIsTyping(false);
    } else {
      setIsTyping(true);
    }
  };

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className={`chat-container ${isChatOpen ? 'open' : ''}`}>
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
              <div key={index} className={`chat-message ${message.user}`}>
                <div className="message-content">
                  <span>{message.text}</span>
                  <div className="message-timestamp">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="typing-indicator">
                <span>Someone is typing...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <form className="chat-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={newMessage}
              onChange={handleTyping}
              placeholder="Type your message..."
              autoFocus
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
