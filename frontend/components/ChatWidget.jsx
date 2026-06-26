import React, { useState, useEffect } from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';
import ChatWindow from './ChatWindow';

const API_BASE_URL = 'http://localhost:5000/api';
const STORAGE_KEY = 'swasthyatap_chat_history';
const SESSION_KEY = 'swasthyatap_chat_session';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');

  // 1. Initialize session ID and load saved chat history from sessionStorage
  useEffect(() => {
    // Generate or fetch session ID
    let currentSessionId = sessionStorage.getItem(SESSION_KEY);
    if (!currentSessionId) {
      currentSessionId = `st_${Math.random().toString(36).substring(2, 11)}_${Date.now()}`;
      sessionStorage.setItem(SESSION_KEY, currentSessionId);
    }
    setSessionId(currentSessionId);

    // Load saved conversation history
    const savedHistory = sessionStorage.getItem(STORAGE_KEY);
    if (savedHistory) {
      try {
        setMessages(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to parse chat history:', e);
      }
    }
  }, []);

  // 2. Persist chat messages whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, [messages]);

  // Format time helper (e.g., "11:42 AM")
  const formatTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // 3. Send Message Handler
  const handleSendMessage = async (text) => {
    const userMsg = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: formatTime()
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          sessionId: sessionId
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch response');
      }

      const botMsg = {
        id: `bot_${Date.now()}`,
        role: 'bot',
        content: data.reply,
        timestamp: formatTime()
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMsg = {
        id: `err_${Date.now()}`,
        role: 'bot',
        content: "I'm sorry, I encountered a connection issue. Please make sure the backend server is running and try again.",
        timestamp: formatTime()
      };
      
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Regenerate Last Response Handler
  const handleRegenerateLast = async () => {
    // Find the last user message
    const userMessages = messages.filter(m => m.role === 'user');
    if (userMessages.length === 0 || isLoading) return;

    const lastUserMsg = userMessages[userMessages.length - 1];

    // Remove any trailing bot messages after this user message
    const lastUserIndex = messages.lastIndexOf(lastUserMsg);
    setMessages(messages.slice(0, lastUserIndex + 1));
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: lastUserMsg.content,
          sessionId: sessionId
        }),
      });

      const data = await response.json();

      const botMsg = {
        id: `bot_${Date.now()}`,
        role: 'bot',
        content: data.reply,
        timestamp: formatTime()
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error('Error regenerating message:', error);
      const errorMsg = {
        id: `err_${Date.now()}`,
        role: 'bot',
        content: "Failed to regenerate response. Please try sending your query again.",
        timestamp: formatTime()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // 5. Clear Chat Handler
  const handleClearChat = async () => {
    setMessages([]);
    sessionStorage.removeItem(STORAGE_KEY);
    
    try {
      await fetch(`${API_BASE_URL}/chat/clear`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });
    } catch (e) {
      console.error('Failed to notify backend of cleared chat:', e);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 font-sans">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="animate-in fade-in slide-in-from-bottom-5 duration-300 origin-bottom-right">
          <ChatWindow
            messages={messages}
            isLoading={isLoading}
            onSendMessage={handleSendMessage}
            onClearChat={handleClearChat}
            onClose={() => setIsOpen(false)}
            onRegenerateLast={handleRegenerateLast}
          />
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl border cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 ${
          isOpen
            ? 'bg-slate-900 border-slate-800 text-white'
            : 'bg-primary border-primary/20 text-white hover:bg-primary/95 shadow-primary/30'
        }`}
      >
        {isOpen ? (
          <div className="relative">
            <MessageSquare size={24} className="scale-x-[-1]" />
          </div>
        ) : (
          <div className="relative">
            <MessageSquare size={24} className="scale-x-[-1] animate-pulse" />
            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-white items-center justify-center">
                <Sparkles size={8} className="text-primary" />
              </span>
            </span>
          </div>
        )}
      </button>

    </div>
  );
}
