import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOCAL_DB_PATH = path.join(__dirname, '../data/db.json');

// Initialize local JSON database if not exists
function ensureLocalDb() {
  const dir = path.dirname(LOCAL_DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(LOCAL_DB_PATH)) {
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify({ users: [], hospitals: [] }, null, 2));
  }
}

// Save to Local JSON file
async function saveToLocalJson(table, data) {
  ensureLocalDb();
  const fileData = fs.readFileSync(LOCAL_DB_PATH, 'utf-8');
  const db = JSON.parse(fileData);
  
  if (!db[table]) {
    db[table] = [];
  }
  
  const record = { id: Date.now().toString(), ...data, createdAt: new Date().toISOString() };
  db[table].push(record);
  
  fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(db, null, 2));
  return record;
}

// Save to MongoDB
async function saveToMongo(collectionName, data) {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DB_NAME || 'swasthyatap');
    const collection = db.collection(collectionName);
    const record = { ...data, createdAt: new Date() };
    const result = await collection.insertOne(record);
    return { id: result.insertedId, ...record };
  } finally {
    await client.close();
  }
}

// Save to Supabase
async function saveToSupabase(tableName, data) {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  const { data: record, error } = await supabase
    .from(tableName)
    .insert([{ ...data, created_at: new Date().toISOString() }])
    .select()
    .single();
    
  if (error) {
    throw error;
  }
  return record;
}

/**
 * Save record to database
 * @param {'users' | 'hospitals'} table Table / Collection name
 * @param {object} data Record details
 */
export async function saveRecord(table, data) {
  console.log(`Saving record to table: ${table}`, data);
  
  // 1. Try MongoDB if configured
  if (process.env.MONGODB_URI) {
    try {
      return await saveToMongo(table, data);
    } catch (err) {
      console.error('Failed to save to MongoDB, falling back...', err);
    }
  }
  
  // 2. Try Supabase if configured
  if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
    try {
      return await saveToSupabase(table, data);
    } catch (err) {
      console.error('Failed to save to Supabase, falling back...', err);
    }
  }
  
  // 3. Default fallback to local JSON database
  return await saveToLocalJson(table, data);
}
