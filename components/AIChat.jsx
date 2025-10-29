import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, User, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import chatResponses from '../utils/chatResponses';

const AIChat = ({ profileData, servicesData, seoData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hey there! 👋 I'm Rahul's AI assistant, and I'm here to help you explore how we can transform your cloud infrastructure.\n\nWhether you're struggling with high AWS bills, planning a migration, or looking to modernize your architecture, I've got you covered. What brings you here today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [bookingButtonVisible, setBookingButtonVisible] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Track booking button visibility to adjust chat position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Same logic as FloatingBookingCTA
      const showThreshold = windowHeight * 0.5;
      const hideThreshold = documentHeight - windowHeight * 2;

      setBookingButtonVisible(
        scrollPosition > showThreshold && scrollPosition < hideThreshold
      );
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // AI Response Generator using static data
  const generateResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // Services-related queries
    if (lowerMessage.includes('service') || lowerMessage.includes('what do you do') || lowerMessage.includes('offerings') || lowerMessage.includes('what can you help')) {
      return chatResponses.services(servicesData);
    }

    // Cost/Pricing queries
    if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('pricing') || lowerMessage.includes('how much') || lowerMessage.includes('charge') || lowerMessage.includes('fee')) {
      return chatResponses.pricing();
    }

    // Experience queries
    if (lowerMessage.includes('experience') || lowerMessage.includes('background') || lowerMessage.includes('who are you') || lowerMessage.includes('about you')) {
      return chatResponses.experience(profileData);
    }

    // Skills queries
    if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech stack') || lowerMessage.includes('expertise')) {
      return chatResponses.skills();
    }

    // AWS-specific queries
    if (lowerMessage.includes('aws') || lowerMessage.includes('amazon') || lowerMessage.includes('cloud')) {
      return chatResponses.aws();
    }

    // Migration queries
    if (lowerMessage.includes('migration') || lowerMessage.includes('migrate') || lowerMessage.includes('move to cloud')) {
      return chatResponses.migration();
    }

    // Serverless queries
    if (lowerMessage.includes('serverless') || lowerMessage.includes('lambda') || lowerMessage.includes('function')) {
      return chatResponses.serverless();
    }

    // Mentorship queries
    if (lowerMessage.includes('mentor') || lowerMessage.includes('learn') || lowerMessage.includes('training') || lowerMessage.includes('coaching') || lowerMessage.includes('career')) {
      return chatResponses.mentorship();
    }

    // AI/ML queries
    if (lowerMessage.includes('ai') || lowerMessage.includes('machine learning') || lowerMessage.includes('ml')) {
      return "I provide **AI/ML consulting services** including:\n\n• **ML Model Development & Deployment** (95% accuracy, 10x faster inference)\n• **AI-Powered Cloud Optimization** (70% cost reduction with ML)\n• **Data Engineering & MLOps** (10TB+ daily processing)\n\nI work with TensorFlow, PyTorch, AWS SageMaker, Bedrock, and LangChain. Currently pursuing Agentic AI certification from IIT Roorkee. How can AI transform your business?";
    }

    // Contact/Booking queries
    if (lowerMessage.includes('contact') || lowerMessage.includes('book') || lowerMessage.includes('schedule') || lowerMessage.includes('call') || lowerMessage.includes('meeting') || lowerMessage.includes('consultation')) {
      return chatResponses.contact();
    }

    // Greeting responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage === 'hi' || lowerMessage === 'hello') {
      return "Hello! 👋 Great to see you here! I'm Rahul's AI assistant, and I'm excited to help you explore how we can solve your cloud challenges.\n\n**I can help you with:**\n• Understanding our services and solutions\n• Discussing pricing and ROI\n• Sharing success stories and case studies\n• Answering technical questions\n• Booking a free consultation\n\nWhat's on your mind today? Feel free to ask me anything! 😊";
    }

    // Thank you responses
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks') || lowerMessage.includes('appreciate')) {
      return "You're very welcome! 😊 I'm here to help anytime.\n\nIs there anything else you'd like to know about:\n• Our AWS consulting services?\n• Specific technical solutions?\n• Pricing and packages?\n• Success stories?\n• Booking a consultation?\n\nDon't hesitate to ask - I'm here to make your cloud journey easier!";
    }

    // Certifications
    if (lowerMessage.includes('certification') || lowerMessage.includes('certified')) {
      return "**Professional Certifications:**\n\n🏆 **4x AWS Community Builder** (Serverless)\n• Multi-year recognition from AWS\n• Active contributor to AWS community\n\n📜 **3+ AWS Certifications**\n• Solutions Architect\n• Developer Associate\n• And more...\n\n🎓 **Currently Pursuing:**\n• PG Certificate in Agentic AI from IIT Roorkee\n\nCertifications validate expertise, but real-world results matter most. Want to see my portfolio?";
    }

    // DevOps queries
    if (lowerMessage.includes('devops') || lowerMessage.includes('ci/cd') || lowerMessage.includes('pipeline')) {
      return "I specialize in **DevOps automation & CI/CD** with impressive results:\n\n• **80% faster deployments**\n• **95% success rate**\n• **10x more releases**\n• **50+ pipelines built**\n\nTechnologies:\n• GitHub Actions, GitLab CI, Jenkins\n• Docker, Kubernetes, ECS\n• Terraform, CloudFormation\n• ArgoCD, Flux\n\nI've hardened fintech APIs with DevSecOps pipelines, reducing vulnerability MTTR from 14 days to 48 hours. Ready to automate your deployments?";
    }

    // Security queries
    if (lowerMessage.includes('security') || lowerMessage.includes('compliance') || lowerMessage.includes('secure')) {
      return "**Security & Compliance** is built into everything I do:\n\n🔒 **Expertise:**\n• IAM least-privilege implementation\n• KMS envelope encryption\n• Security Hub & GuardDuty\n• PCI-DSS, ISO 27001 compliance\n\n✅ **Results:**\n• Passed audits first try\n• Secured 200+ AWS resources\n• Reduced vulnerability MTTR by 96%\n• Zero security incidents post-implementation\n\nI follow AWS Well-Architected Framework security pillar. Need a security audit?";
    }

    // Kubernetes queries
    if (lowerMessage.includes('kubernetes') || lowerMessage.includes('k8s') || lowerMessage.includes('container')) {
      return "I'm experienced with **Kubernetes & container orchestration**:\n\n🐳 **Container Technologies:**\n• Docker, Kubernetes, ECS, EKS\n• Helm charts & GitOps (ArgoCD, Flux)\n• Service mesh (Istio, Linkerd)\n\n📦 **Use Cases:**\n• Microservices deployment\n• Auto-scaling workloads\n• Multi-cloud portability\n• Zero-downtime updates\n\nI've migrated monoliths to containerized microservices with 60% faster deployments. Interested in Kubernetes adoption?";
    }

    // Terraform/IaC queries
    if (lowerMessage.includes('terraform') || lowerMessage.includes('infrastructure as code') || lowerMessage.includes('iac')) {
      return "**Infrastructure as Code** is essential for modern cloud:\n\n📝 **IaC Tools:**\n• Terraform (primary)\n• AWS CloudFormation\n• Pulumi, CDK\n\n✨ **Benefits:**\n• Version-controlled infrastructure\n• Repeatable deployments\n• Disaster recovery ready\n• Cost tracking & optimization\n\nI've automated infrastructure provisioning for 50+ projects, reducing manual errors by 95%. Want to codify your infrastructure?";
    }

    // Greeting responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! 👋 I'm here to help you learn about Rahul's AWS consulting services and expertise. I can answer questions about:\n\n• Cloud services & solutions\n• Pricing & packages\n• Technical skills & experience\n• Success stories & results\n• Booking a consultation\n\nWhat would you like to know?";
    }

    // Thank you responses
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're welcome! 😊 Is there anything else you'd like to know about AWS consulting, cloud architecture, or how I can help your business? I'm here to help!";
    }

    // Help/Options
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you')) {
      return "I can help you with:\n\n**Services & Solutions:**\n• Cloud Migration\n• AWS Architecture Review\n• Cost Optimization\n• Serverless Development\n• DevOps & CI/CD\n• AI/ML Integration\n• Technical Mentorship\n\n**Information:**\n• Pricing & packages\n• Experience & certifications\n• Technologies & skills\n• Success stories\n• Contact & booking\n\nJust ask me anything!";
    }

    // Default response
    return chatResponses.default();
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        text: generateResponse(inputValue),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 seconds delay
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    "💰 How can you reduce my AWS costs?",
    "🚀 Tell me about cloud migration",
    "🎓 Do you offer mentorship?",
    "⚡ What's serverless architecture?",
    "📞 How do I get started?",
    "🏆 Show me your success stories",
  ];

  const handleQuickQuestion = (question) => {
    setInputValue(question);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              bottom: bookingButtonVisible ? '6.5rem' : '1.5rem' // 104px when booking visible, 24px when hidden
            }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed right-6 z-[60] bg-primary hover:bg-secondary text-white p-4 rounded-full shadow-2xl hover:shadow-primary/30 transition-all duration-300"
            style={{ bottom: bookingButtonVisible ? '6.5rem' : '1.5rem' }}
            aria-label="Open AI Chat"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse"></span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-[60] w-[400px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-3rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-primary text-white p-4 flex items-center justify-between border-b-2 border-accent">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-accent" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-white"></span>
                </div>
                <div>
                  <h3 className="font-semibold">AI Assistant</h3>
                  <p className="text-xs text-white/80">Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-2 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' ? 'bg-primary' : 'bg-accent'
                    }`}
                  >
                    {message.type === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                      message.type === 'user'
                        ? 'bg-primary text-white rounded-tr-none'
                        : 'bg-white text-text-primary rounded-tl-none shadow-sm border border-border'
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap break-words">
                      {message.text.split('\n').map((line, i) => {
                        // Handle bold text
                        const parts = line.split(/(\*\*.*?\*\*)/g);
                        return (
                          <p key={i} className={i > 0 ? 'mt-2' : ''}>
                            {parts.map((part, j) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={j}>{part.slice(2, -2)}</strong>;
                              }
                              return part;
                            })}
                          </p>
                        );
                      })}
                    </div>
                    <div
                      className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-white/70' : 'text-text-secondary'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm border border-border">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length <= 2 && (
              <div className="px-4 py-2 bg-white border-t border-border">
                <p className="text-xs text-text-secondary mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.slice(0, 3).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="text-xs bg-surface hover:bg-accent/10 text-text-primary hover:text-accent px-3 py-1.5 rounded-full transition-colors border border-border"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 bg-white border-t border-border">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-2.5 bg-white border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-sm text-text-primary placeholder:text-text-secondary transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="bg-accent hover:bg-accent/90 text-white p-2.5 rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-text-secondary mt-2 text-center">
                Powered by AI • Instant responses
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;
