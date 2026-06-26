import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const KNOWLEDGE_PATH = path.join(__dirname, '../knowledge/knowledge.json');

let cachedKnowledge = null;

/**
 * Loads the knowledge database from the knowledge.json file.
 * Implements caching for high-performance retrieval.
 */
export async function getKnowledge() {
  if (cachedKnowledge) {
    return cachedKnowledge;
  }
  try {
    const data = await fs.readFile(KNOWLEDGE_PATH, 'utf-8');
    cachedKnowledge = JSON.parse(data);
    return cachedKnowledge;
  } catch (error) {
    console.error('Error reading knowledge.json file:', error);
    throw new Error('Failed to load website knowledge base.');
  }
}

/**
 * Clears the cached knowledge database.
 * Useful if the file was updated dynamically.
 */
export function invalidateKnowledgeCache() {
  cachedKnowledge = null;
}

/**
 * Generates a clean text string containing all knowledge
 * to be injected into the LLM system prompt.
 */
export async function getKnowledgeContext() {
  const knowledge = await getKnowledge();
  return JSON.stringify(knowledge, null, 2);
}
