import React, { useState, useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { Bot, MessageCircle } from 'lucide-react';
import { Message } from './types/Message';
import { MessageBubble } from './components/MessageBubble';
import { TypingIndicator } from './components/TypingIndicator';
import { ChatInput } from './components/ChatInput';
import { generateAIResponse } from './services/aiService';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI assistant. I'm here to help answer questions, provide information, and have meaningful conversations with you. What would you like to talk about today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (messageText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const aiResponseText = await generateAIResponse(messageText);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date(),
      };

      setIsTyping(false);
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      setIsTyping(false);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <Container fluid className="p-0">
      <div className="chat-container">
        {/* Chat Header */}
        <div className="chat-header">
          <div className="d-flex align-items-center justify-content-center gap-2">
            <Bot size={24} color="#007bff" />
            <h4 className="mb-0" style={{ color: '#333', fontWeight: '600' }}>
              AI Chat Assistant
            </h4>
          </div>
          <small className="text-muted">
            Ask me anything! I'm here to help.
          </small>
        </div>

        {/* Chat Messages */}
        <div className="chat-messages">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          
          {isTyping && <TypingIndicator />}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="chat-input-container">
          <ChatInput 
            onSendMessage={handleSendMessage} 
            disabled={isTyping}
          />
          <div className="text-center mt-2">
            <small className="text-muted d-flex align-items-center justify-content-center gap-1">
              <MessageCircle size={12} />
              Powered by AI • Built with React & Bootstrap
            </small>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default App;