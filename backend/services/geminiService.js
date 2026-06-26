import { GoogleGenerativeAI } from '@google/generative-ai';
import { getKnowledgeContext } from './knowledgeService.js';

// In-memory conversation store. Keeps only the last 10 messages per sessionId.
// In production, this can be moved to Redis or a session database.
const conversationMemory = new Map();
const MAX_MEMORY_MESSAGES = 10;

/**
 * Gets or initializes chat history for a session.
 */
function getOrCreateSessionHistory(sessionId) {
  if (!conversationMemory.has(sessionId)) {
    conversationMemory.set(sessionId, []);
  }
  return conversationMemory.get(sessionId);
}

/**
 * Appends a message to the session history, maintaining a sliding window of the last 10 messages.
 */
function appendToHistory(sessionId, role, text) {
  const history = getOrCreateSessionHistory(sessionId);
  history.push({ role, parts: [{ text }] });
  
  // Keep only the last N messages
  if (history.length > MAX_MEMORY_MESSAGES) {
    conversationMemory.set(sessionId, history.slice(-MAX_MEMORY_MESSAGES));
  } else {
    conversationMemory.set(sessionId, history);
  }
}

/**
 * Clears the history for a given session.
 */
export function clearSessionHistory(sessionId) {
  if (conversationMemory.has(sessionId)) {
    conversationMemory.delete(sessionId);
    return true;
  }
  return false;
}

/**
 * Fallback responses for options and common greetings when Gemini is unavailable.
 */
export function getHardcodedReply(userMessage) {
  const clean = userMessage.toLowerCase().trim();

  // Exact option matches or variations
  if (clean.includes("how does the card work in an emergency") || clean.includes("how does the card work")) {
    return "If you are unconscious or unable to speak, a bystander or first responder can tap your SwasthyaTap card with their NFC-enabled smartphone. This opens a secure webpage showing your blood group, emergency contacts, and allergies. They can also press 'Alert Family' to dispatch your live GPS location to your family.";
  }
  if (clean.includes("is my data secure") || clean.includes("data secure")) {
    return "Yes. SwasthyaTap uses AES-256 encryption. Basic emergency info (like blood group and emergency contacts) is public for saving your life. Sensitive medical records, documents, and history are locked behind a secure 4-digit PIN that only you or authorized medical staff can access.";
  }
  if (clean.includes("cost of the card") || clean.includes("cost") || clean.includes("price") || clean.includes("what is the cost")) {
    return "The Standard PVC Card is completely FREE to ensure every citizen can access emergency identification. Premium metal cards, wristbands, and rings are available starting from ₹299.";
  }
  if (clean.includes("require internet") || clean.includes("offline") || clean.includes("no internet")) {
    return "No. The critical life-saving information is stored directly on the card's offline NFC chip, allowing first responders to view it even when internet coverage is unavailable.";
  }
  if (clean.includes("register as a blood donor") || clean.includes("blood donor") || clean.includes("register blood donor")) {
    return "You can sign up on our website's 'Blood Network' section. When a local hospital requires blood, our automated system searches for matching donors within a 5km radius and coordinates confirmations via SMS.";
  }

  // Greetings: hii, heloo, hi, hello, hey, etc.
  const greetingRegex = /^(hi+|hello+|heloo+|hey+|hola|greetings)$/i;
  if (greetingRegex.test(clean)) {
    return "Hello! I am SwasthyaTap AI. I can help you understand how our NFC Health Cards work, registration steps, pricing options, and policies. Feel free to ask a question or select one of the suggested questions below!";
  }

  // Wha matching: "wha", "what is swasthyatap", "what is this", "what is swasthya tap"
  if (clean.startsWith("wha") || clean.includes("what is swasthyatap") || clean.includes("what is this") || clean.includes("what is swasthya tap")) {
    return "SwasthyaTap is an innovative health identity platform offering a ₹20 NFC-enabled card that acts as a life-saving tool during medical emergencies (the Golden Hour). By tapping the card with any NFC-enabled smartphone, critical medical info is shown instantly without needing any app or active internet. The system also instantly alerts the user's family with their live GPS location.";
  }

  return null;
}

/**
 * Generates response using Gemini API and handles the context constraint.
 */
export async function generateChatReply(sessionId, userMessage) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is not defined. Attempting hardcoded fallback...');
    const fallback = getHardcodedReply(userMessage);
    if (fallback) {
      appendToHistory(sessionId, 'user', userMessage);
      appendToHistory(sessionId, 'model', fallback);
      return fallback;
    }
    throw new Error('GEMINI_API_KEY is not defined in environment variables.');
  }

  // Initialize Gemini client
  const genAI = new GoogleGenerativeAI(apiKey);
  // We use gemini-1.5-flash as it is fast, cheap, and supports systemInstructions.
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  // Get current knowledge base
  const knowledgeContext = await getKnowledgeContext();

  // Create the system prompt
  const systemInstruction = `You are the official AI assistant for the SwasthyaTap website.

Only answer using the provided website knowledge below.
Do not use your own knowledge.
If the answer is not found in the website knowledge, reply exactly:
'I couldn't find that information on this website. Please contact support if you need further assistance.'

Never guess.
Never hallucinate.
Never answer unrelated questions.
Never answer general knowledge or political questions. If the user asks something unrelated, reply exactly:
'I'm sorry, but I can only answer questions related to this website.'

Here is the official website knowledge base in JSON format:
${knowledgeContext}`;

  // Get previous messages for this session
  const history = [...getOrCreateSessionHistory(sessionId)];

  try {
    // Start a chat session with history and system instruction
    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 800,
        temperature: 0.1, // low temperature to ensure factual replies based solely on knowledge base
      },
      systemInstruction: systemInstruction,
    });

    const result = await chat.sendMessage(userMessage);
    const replyText = result.response.text();

    // Save user message and bot reply to memory
    appendToHistory(sessionId, 'user', userMessage);
    appendToHistory(sessionId, 'model', replyText);

    return replyText.trim();
  } catch (error) {
    console.error('Gemini API call failed. Attempting hardcoded fallback...', error);
    const fallback = getHardcodedReply(userMessage);
    if (fallback) {
      appendToHistory(sessionId, 'user', userMessage);
      appendToHistory(sessionId, 'model', fallback);
      return fallback;
    }
    throw new Error('Failed to generate response from AI Service.');
  }
}
