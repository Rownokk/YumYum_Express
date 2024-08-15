import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faTimes } from '@fortawesome/free-solid-svg-icons'; // Changed icon
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [contextMenu, setContextMenu] = useState({ visible: false, messageIndex: null, x: 0, y: 0 });
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

  const handleContextMenu = (event, index) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      messageIndex: index,
      x: event.pageX,
      y: event.pageY,
    });
  };

  const handleCopyMessage = () => {
    const messageText = messages[contextMenu.messageIndex].text;
    navigator.clipboard.writeText(messageText);
    setContextMenu({ ...contextMenu, visible: false });
  };

  const handleDeleteMessage = () => {
    const updatedMessages = messages.filter((_, index) => index !== contextMenu.messageIndex);
    setMessages(updatedMessages);
    setContextMenu({ ...contextMenu, visible: false });
  };

  const closeContextMenu = () => {
    setContextMenu({ ...contextMenu, visible: false });
  };

  return (
    <div className={`chat-container ${isChatOpen ? 'open' : ''}`}>
      <div className="chat-icon-container">
        <div className="chat-icon-label">Need Help?</div>
        <FontAwesomeIcon
          icon={faUtensils} // Updated to food-related icon
          className="chat-icon"
          onClick={handleChatToggle}
        />
      </div>
      {isChatOpen && (
        <div className="chat-window" onClick={closeContextMenu}>
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
              <div
                key={index}
                className={`chat-message ${message.user}`}
                onContextMenu={(e) => handleContextMenu(e, index)}
              >
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
      {contextMenu.visible && (
        <div
          className="context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <div onClick={handleCopyMessage}>Copy Message</div>
          <div onClick={handleDeleteMessage}>Delete Message</div>
        </div>
      )}
    </div>
  );
};

export default Chat;
