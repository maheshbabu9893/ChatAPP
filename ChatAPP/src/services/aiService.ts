const AI_RESPONSES = [
  "That's a great question! Let me think about that for a moment...",
  "I understand what you're asking. Based on my knowledge...",
  "Interesting perspective! Here's how I would approach this:",
  "That's something I can definitely help you with. Let me explain...",
  "I see what you mean. From my understanding...",
  "Great point! Here's what I know about that topic:",
  "That's a thoughtful question. In my experience...",
  "I'm glad you asked about that. Here's my take:",
  "That's definitely worth exploring. From what I know...",
  "Excellent question! Let me break this down for you...",
];

const TOPIC_RESPONSES: Record<string, string[]> = {
  programming: [
    "Programming is a fantastic skill to develop! I'd recommend starting with languages like Python or JavaScript, which are beginner-friendly and have great communities.",
    "Great question about programming! The key is to practice consistently and work on projects that interest you. Don't be afraid to make mistakes - that's how you learn!",
    "When it comes to programming, I always suggest focusing on problem-solving skills first. The syntax of any language can be learned, but logical thinking is fundamental.",
  ],
  technology: [
    "Technology is evolving so rapidly! It's exciting to see how AI, machine learning, and other innovations are shaping our future.",
    "That's a fascinating topic in tech! The key is staying curious and continuously learning, as the field changes so quickly.",
    "Technology has such a profound impact on our daily lives. It's important to understand both the benefits and challenges it brings.",
  ],
  science: [
    "Science is all about curiosity and discovery! I love how scientific thinking helps us understand the world around us.",
    "That's a wonderful scientific question! The beauty of science is that it's always evolving as we discover new things.",
    "Scientific literacy is so important in today's world. It helps us make informed decisions and understand complex issues.",
  ],
  life: [
    "Life is full of interesting challenges and opportunities! I find that maintaining a growth mindset really helps navigate various situations.",
    "That's a thoughtful question about life. Sometimes the best approach is to stay open to new experiences and learn from both successes and setbacks.",
    "Life has a way of surprising us, doesn't it? I think embracing uncertainty while staying true to your values is a good philosophy.",
  ],
};

const getRandomResponse = (responses: string[]): string => {
  return responses[Math.floor(Math.random() * responses.length)];
};

const detectTopic = (message: string): string | null => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('code') || lowerMessage.includes('program') || lowerMessage.includes('developer') || lowerMessage.includes('javascript') || lowerMessage.includes('python') || lowerMessage.includes('react')) {
    return 'programming';
  }
  
  if (lowerMessage.includes('tech') || lowerMessage.includes('computer') || lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence') || lowerMessage.includes('machine learning')) {
    return 'technology';
  }
  
  if (lowerMessage.includes('science') || lowerMessage.includes('research') || lowerMessage.includes('experiment') || lowerMessage.includes('theory')) {
    return 'science';
  }
  
  if (lowerMessage.includes('life') || lowerMessage.includes('advice') || lowerMessage.includes('help') || lowerMessage.includes('problem') || lowerMessage.includes('difficult')) {
    return 'life';
  }
  
  return null;
};

export const generateAIResponse = async (userMessage: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  const topic = detectTopic(userMessage);
  
  if (topic && TOPIC_RESPONSES[topic]) {
    return getRandomResponse(TOPIC_RESPONSES[topic]);
  }
  
  // Special responses for common greetings
  if (userMessage.toLowerCase().match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
    return getRandomResponse([
      "Hello! I'm happy to chat with you today. What's on your mind?",
      "Hi there! I'm here to help answer any questions you might have. What would you like to know?",
      "Hey! Great to meet you. Feel free to ask me anything you're curious about!",
      "Hello! I'm excited to have a conversation with you. What interests you today?",
    ]);
  }
  
  if (userMessage.toLowerCase().includes('how are you') || userMessage.toLowerCase().includes('how do you feel')) {
    return getRandomResponse([
      "I'm doing well, thank you for asking! I'm always excited to learn new things and help people. How are you doing today?",
      "I'm great! I find every conversation fascinating. There's always something new to discover. How about you?",
      "I'm feeling curious and ready to chat! Each conversation teaches me something new. What's been on your mind lately?",
    ]);
  }
  
  return getRandomResponse(AI_RESPONSES) + " " + getRandomResponse([
    "What specific aspect would you like to explore further?",
    "Does this help answer your question?",
    "What are your thoughts on this?",
    "I'd love to hear your perspective on this too.",
    "Feel free to ask if you need clarification on anything!",
  ]);
};