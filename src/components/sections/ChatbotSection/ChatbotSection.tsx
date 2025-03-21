// src/components/sections/ChatbotSection/ChatbotSection.tsx
import { useState } from 'react';
import { FaRobot, FaPaperPlane, FaTimes } from 'react-icons/fa';
import styles from './ChatbotSection.module.css';

const ChatbotSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm EntreBot. How can I help you today?", sender: 'bot' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim() === '') return;
    
    // Add user message
    setMessages([...messages, { text: newMessage, sender: 'user' }]);
    setNewMessage('');
    
    // Simulate bot response after a delay
    setTimeout(() => {
      setMessages(prevMessages => [
        ...prevMessages, 
        { 
          text: "Thanks for your message! I'm a demo chatbot. In the real application, I'd provide helpful information about finding mentors, co-founders, or startup resources.", 
          sender: 'bot' 
        }
      ]);
    }, 1000);
  };
  
  return (
    <section className={styles.chatbotSection}>
      <div className={styles.container}>
        <div className={styles.chatbotInfo}>
          <div className={styles.chatbotIcon}>
            <FaRobot />
          </div>
          <h2 className={styles.sectionTitle}>Meet Ito</h2>
          <div className={styles.chatbotTextContent}>
            <h2 className={styles.chatbotTitle}>
              Smart AI Assistant
            </h2>
            <p className={styles.chatbotDescription}>
              Our AI assistant is here to help you navigate ITO, find resources, and connect with the right people for your startup journey.
            </p>
          </div>
          <button className={styles.startChatButton} onClick={toggleChatbot}>
            Start a Conversation
          </button>
        </div>
        
        {/* Floating chat button (visible on all pages) */}
        <button 
          className={`${styles.chatButton} ${isOpen ? styles.hidden : ''}`}
          onClick={toggleChatbot}
        >
          <FaRobot className={styles.chatButtonIcon} />
          <span>Chat with EntreBot</span>
        </button>
        
        {/* Chatbot window */}
        <div className={`${styles.chatbotWindow} ${isOpen ? styles.open : ''}`}>
          <div className={styles.chatHeader}>
            <div className={styles.chatHeaderInfo}>
              <FaRobot className={styles.chatHeaderIcon} />
              <span>EntreBot</span>
            </div>
            <button className={styles.closeButton} onClick={toggleChatbot}>
              <FaTimes />
            </button>
          </div>
          
          <div className={styles.chatMessages}>
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`${styles.message} ${message.sender === 'user' ? styles.userMessage : styles.botMessage}`}
              >
                {message.text}
              </div>
            ))}
          </div>
          
          <form className={styles.chatInput} onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className={styles.messageInput}
            />
            <button type="submit" className={styles.sendButton}>
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChatbotSection;