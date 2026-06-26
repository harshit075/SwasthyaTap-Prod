import React, { useState } from 'react';
import { Copy, Check, RotateCcw, User, Bot, Activity } from 'lucide-react';

/**
 * Basic markdown parser to handle **bold**, lists (* or -), and line breaks.
 * This avoids external dependency bloat and ensures React 19 compatibility.
 */
function formatMessageContent(text) {
  if (!text) return '';
  
  // Escape HTML tags to prevent HTML injection
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Bold text (**text**)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Bullet points
  const lines = html.split('\n');
  let inList = false;
  const processedLines = lines.map(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      const content = trimmed.substring(2);
      let prefix = '';
      if (!inList) {
        inList = true;
        prefix = '<ul class="list-disc pl-5 my-1.5 space-y-1">';
      }
      return `${prefix}<li>${content}</li>`;
    } else {
      let suffix = '';
      if (inList) {
        inList = false;
        suffix = '</ul>';
      }
      return suffix + line;
    }
  });

  if (inList) {
    processedLines.push('</ul>');
  }

  return processedLines.join('<br />');
}

export default function Message({ message, isLast, onRegenerate }) {
  const { role, content, timestamp } = message;
  const isBot = role === 'bot';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex w-full gap-3 py-3 px-4 transition-all duration-300 ${
      isBot ? 'bg-transparent' : 'bg-gray-50/70 border-y border-gray-100/30'
    }`}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-sm border ${
          isBot 
            ? 'bg-gradient-to-br from-primary to-primary/80 border-primary/20 text-white' 
            : 'bg-white border-gray-200 text-secondary/60'
        }`}>
          {isBot ? (
            <Activity size={15} className="animate-pulse" />
          ) : (
            <User size={15} />
          )}
        </div>
      </div>

      {/* Message content & Meta */}
      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-secondary">
            {isBot ? 'SwasthyaTap Assistant' : 'You'}
          </span>
          <span className="text-[10px] text-secondary/40 font-medium">
            {timestamp}
          </span>
        </div>

        <div 
          className="text-sm text-secondary/80 leading-relaxed break-words font-normal"
          dangerouslySetInnerHTML={{ __html: formatMessageContent(content) }}
        />

        {/* Action buttons */}
        <div className="flex items-center gap-1.5 mt-1.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleCopy}
            title="Copy message"
            className="p-1.5 rounded-lg hover:bg-gray-100 text-secondary/40 hover:text-secondary/70 transition-all cursor-pointer active:scale-95"
          >
            {copied ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
          </button>
          
          {isBot && isLast && onRegenerate && (
            <button
              onClick={onRegenerate}
              title="Regenerate response"
              className="p-1.5 rounded-lg hover:bg-gray-100 text-secondary/40 hover:text-secondary/70 transition-all cursor-pointer active:scale-95"
            >
              <RotateCcw size={13} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
