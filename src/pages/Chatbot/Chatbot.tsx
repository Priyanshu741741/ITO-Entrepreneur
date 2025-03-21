import { useState } from "react";
import styles from "./Chatbot.module.css";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

const Chatbot: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: "Hello! How can I help you with your startup today?", isUser: false }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const predefinedResponses = {
    "hello": "Hi, How Can I Help you today?",
    "funding": "There are several funding options for startups: bootstrapping, angel investors, venture capital, crowdfunding, and small business loans. Each has its pros and cons depending on your business model.",
    "business plan": "A good business plan should include an executive summary, company description, market analysis, organization structure, product line, marketing strategy, funding request, and financial projections.",
    "pitch deck": "An effective pitch deck typically has 10-12 slides covering: problem, solution, business model, market opportunity, competition, team, traction, financials, and funding needs.",
    "marketing": "Focus on digital marketing strategies like content marketing, SEO, social media marketing, email campaigns, and partnerships with complementary businesses.",
    "incorporation": "Common business structures include sole proprietorship, partnership, LLC, and corporation. Each has different legal and tax implications.",
    "pricing": "Consider cost-plus pricing, value-based pricing, competitive pricing, or freemium models. Your pricing strategy should align with your value proposition.",
    "mvp": "A Minimum Viable Product (MVP) should focus on core features that solve the main problem for your target customers. Keep it simple but valuable.",
    "scaling": "To scale efficiently, focus on automating processes, building a strong team, securing adequate funding, and creating systems that can handle growth."
  };

  const handleSubmit = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length,
      text: input,
      isUser: true
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      let responseText = "I'm not sure about that. Could you ask about funding, business plans, pitch decks, marketing, incorporation, pricing, MVPs, or scaling strategies?";
      
      // Check for keywords in the input
      const lowercaseInput = input.toLowerCase();
      
      for (const [keyword, response] of Object.entries(predefinedResponses)) {
        if (lowercaseInput.includes(keyword)) {
          responseText = response;
          break;
        }
      }
      
      // Add bot response
      const botMessage: Message = {
        id: messages.length + 1,
        text: responseText,
        isUser: false
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsProcessing(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className={styles.chatContainer}>
      <h1 className={styles.title}>Startup Assistant</h1>
      
      <div className={styles.messagesContainer}>
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`${styles.message} ${message.isUser ? styles.userMessage : styles.botMessage}`}
          >
            {message.text}
          </div>
        ))}
        {isProcessing && (
          <div className={`${styles.message} ${styles.botMessage}`}>
            <div className={styles.typingIndicator}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>
      
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about funding, business plans, marketing..."
          className={styles.inputField}
          disabled={isProcessing}
        />
        <button 
          onClick={handleSubmit} 
          className={styles.sendButton}
          disabled={isProcessing}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;