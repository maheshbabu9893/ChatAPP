import React from 'react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="typing-indicator">
      <div className="typing-dots">
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
      </div>
      <span style={{ fontSize: '0.8rem', color: '#666', marginLeft: '0.25rem' }}>
        AI is typing...
      </span>
    </div>
  );
};