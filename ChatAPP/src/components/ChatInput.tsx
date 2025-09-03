import React, { useState, KeyboardEvent } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !disabled) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Type your question here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={disabled}
          style={{ 
            border: 'none',
            boxShadow: '0 0 0 1px rgba(0,0,0,0.1)',
            fontSize: '1rem',
            padding: '0.75rem 1rem'
          }}
        />
        <Button
          variant="primary"
          type="submit"
          disabled={!inputValue.trim() || disabled}
          className="send-button"
        >
          <Send size={16} />
        </Button>
      </InputGroup>
    </Form>
  );
};