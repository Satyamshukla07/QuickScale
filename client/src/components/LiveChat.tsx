import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AUTO_RESPONSES = [
  "Thanks for reaching out! Our team will be with you shortly.",
  "Hello! How can the QuickScale team help you today?",
  "We usually respond within 10 minutes during business hours.",
  "Feel free to leave your email if you'd like us to follow up with you."
];

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to the bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message when chat is first opened
      setTimeout(() => {
        setMessages([
          {
            id: 1,
            text: "Welcome to QuickScale! How can we help you today?",
            isUser: false,
            timestamp: new Date()
          }
        ]);
      }, 500);
    }
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage.trim(),
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    
    // Simulate agent typing
    setIsTyping(true);
    
    // Simulate response after a delay
    setTimeout(() => {
      setIsTyping(false);
      
      // Pick a random auto-response
      const responseText = AUTO_RESPONSES[Math.floor(Math.random() * AUTO_RESPONSES.length)];
      
      const botResponse: Message = {
        id: messages.length + 2,
        text: responseText,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    }, 1500);
  };

  return (
    <>
      {/* Chat button */}
      <motion.button
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-neon-purple text-white shadow-lg shadow-neon-purple/30 flex items-center justify-center z-[100] hover:bg-electric-blue transition-colors duration-300"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <MessageCircle size={28} />
      </motion.button>
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 sm:w-96 h-96 bg-dark-bg flex flex-col rounded-xl shadow-2xl shadow-neon-purple/20 z-[100] overflow-hidden glass"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-electric-blue to-neon-purple text-white flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                  <User size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold">QuickScale Support</h3>
                  <p className="text-xs text-white/80">We typically reply within minutes</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-white/70 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Messages area */}
            <div className="flex-1 p-4 overflow-y-auto bg-transparent">
              <div className="space-y-4">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-lg ${
                        message.isUser
                          ? "bg-neon-purple text-white rounded-br-none"
                          : "bg-white/10 backdrop-blur-sm text-white rounded-bl-none"
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className="text-xs opacity-70 mt-1 flex items-center">
                        <Clock size={12} className="mr-1" />
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg rounded-bl-none max-w-[80%]">
                      <div className="flex space-x-1">
                        <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                        <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                        <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Input area */}
            <div className="p-3 border-t border-white/10">
              <div className="flex items-center">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 bg-white/10 text-white placeholder-white/50 rounded-l-md px-4 py-2 focus:outline-none"
                  placeholder="Type your message..."
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-electric-blue hover:bg-neon-purple text-white rounded-l-none px-4 py-2 h-full"
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}