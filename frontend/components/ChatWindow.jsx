import React, { useState, useRef, useEffect } from 'react';
import { Send, Trash2, X, ChevronDown, Sparkles } from 'lucide-react';
import Message from './Message';
import SuggestedQuestions from './SuggestedQuestions';

export default function ChatWindow({
  messages,
  isLoading,
  onSendMessage,
  onClearChat,
  onClose,
  onRegenerateLast
}) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  // Auto-scroll to bottom on new messages or loading state
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Monitor scroll height to show/hide "scroll to bottom" button
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    // Show button if user scrolled up more than 150px
    const isScrolledUp = scrollHeight - scrollTop - clientHeight > 150;
    setShowScrollBtn(isScrolledUp);
  };

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    onSendMessage(input.trim());
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[520px] sm:h-[600px] w-full sm:w-[400px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(29,53,87,0.15)] border border-gray-100 overflow-hidden relative">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary to-slate-900 text-white px-5 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
              <Sparkles size={16} className="text-primary animate-pulse" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 border-2 border-secondary rounded-full" />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-sm leading-tight">SwasthyaTap Assistant</h3>
            <span className="text-[10px] text-white/50 block">Replies instantly</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <button
              onClick={onClearChat}
              title="Clear chat"
              className="p-2 hover:bg-white/15 rounded-xl text-white/70 hover:text-white transition-all cursor-pointer"
            >
              <Trash2 size={16} />
            </button>
          )}
          <button
            onClick={onClose}
            title="Close chat"
            className="p-2 hover:bg-white/15 rounded-xl text-white/70 hover:text-white transition-all cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto bg-[#FAFDFB]/50 flex flex-col relative"
      >
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col justify-between py-6">
            <div className="px-6 text-center mt-4">
              <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-3 border border-primary/10">
                <Sparkles className="text-primary" size={20} />
              </div>
              <h4 className="font-bold text-secondary text-sm">Hello! I am SwasthyaTap AI</h4>
              <p className="text-xs text-secondary/50 mt-1.5 max-w-[260px] mx-auto leading-relaxed">
                I can help you understand how our NFC Health Cards work, registration steps, pricing options, and policies.
              </p>
            </div>
            
            <SuggestedQuestions onSelectQuestion={(q) => onSendMessage(q)} />
          </div>
        ) : (
          <div className="flex flex-col py-2">
            {messages.map((msg, idx) => (
              <div key={msg.id} className="group">
                <Message
                  message={msg}
                  isLast={idx === messages.length - 1}
                  onRegenerate={onRegenerateLast}
                />
              </div>
            ))}
          </div>
        )}

        {/* Typing loader */}
        {isLoading && (
          <div className="flex gap-3 py-3 px-4 bg-transparent">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary/80 border border-primary/20 flex items-center justify-center text-white">
              <Sparkles size={14} className="animate-spin [animation-duration:3s]" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-secondary">SwasthyaTap Assistant</span>
              <div className="bg-gray-100/80 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1 w-16">
                <div className="w-1.5 h-1.5 bg-secondary/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-1.5 h-1.5 bg-secondary/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-1.5 h-1.5 bg-secondary/50 rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Floating scroll to bottom button */}
      {showScrollBtn && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-20 right-4 bg-white text-secondary hover:text-primary shadow-lg border border-gray-100 p-2 rounded-full cursor-pointer hover:scale-105 transition-all z-10"
        >
          <ChevronDown size={18} />
        </button>
      )}

      {/* Input Form Footer */}
      <div className="p-4 border-t border-gray-100 bg-white">
        <div className="relative flex items-end gap-2 bg-gray-50 border border-gray-200/80 rounded-2xl p-2 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/5 transition-all">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, 600))}
            onKeyDown={handleKeyDown}
            placeholder="Ask about SwasthyaTap..."
            rows={1}
            className="flex-1 bg-transparent border-0 outline-none focus:ring-0 text-sm py-1.5 px-2 resize-none max-h-24 font-normal text-secondary placeholder-secondary/30"
            style={{ height: 'auto' }}
          />
          
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-2 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
              input.trim() && !isLoading
                ? 'bg-primary text-white hover:bg-primary/95 shadow-md shadow-primary/25 active:scale-95'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send size={16} />
          </button>
        </div>
        
        {/* Footer meta / character counter */}
        <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-secondary/40 font-medium">
          <span>Only questions about SwasthyaTap are answered.</span>
          <span>{input.length}/600</span>
        </div>
      </div>

    </div>
  );
}
