import express from 'express';
import { generateChatReply, clearSessionHistory } from '../services/geminiService.js';
import { chatRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

/**
 * Escapes HTML characters to prevent cross-site scripting (XSS).
 */
function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

/**
 * POST /api/chat
 * Handles sending a message to the AI chatbot.
 */
router.post('/chat', chatRateLimiter, async (req, res) => {
  const { message, sessionId = 'default-session' } = req.body;

  // 1. Validation
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message field is required and must be a string.' });
  }

  const trimmedMessage = message.trim();
  if (trimmedMessage.length === 0) {
    return res.status(400).json({ error: 'Message cannot be empty.' });
  }

  // 2. Limit message length (e.g. 600 characters max)
  if (trimmedMessage.length > 600) {
    return res.status(400).json({ error: 'Message length exceeds the maximum allowed limit of 600 characters.' });
  }

  // 3. Escape HTML to prevent XSS
  const safeMessage = escapeHTML(trimmedMessage);
  const safeSessionId = escapeHTML(sessionId);

  try {
    // 4. Generate reply using Gemini + Knowledge Base context
    const reply = await generateChatReply(safeSessionId, safeMessage);
    
    return res.json({ reply });
  } catch (error) {
    console.error('Chat endpoint error:', error);
    return res.status(500).json({ 
      reply: "I'm sorry, I'm having trouble connecting to my brain right now. Please try again in a few moments." 
    });
  }
});

/**
 * POST /api/chat/clear
 * Clears conversation memory for a session.
 */
router.post('/chat/clear', (req, res) => {
  const { sessionId = 'default-session' } = req.body;
  const safeSessionId = escapeHTML(sessionId);

  const cleared = clearSessionHistory(safeSessionId);
  return res.json({ success: cleared });
});

export default router;
