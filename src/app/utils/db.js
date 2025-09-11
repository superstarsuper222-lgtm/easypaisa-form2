import { MongoClient } from 'mongodb';

const uri = "mongodb://superstarsuper222_db_user:pa2Om3Ra222zdwy8@ac-1z6i8sh-shard-00-00.astjnhm.mongodb.net:27017,ac-1z6i8sh-shard-00-01.astjnhm.mongodb.net:27017,ac-1z6i8sh-shard-00-02.astjnhm.mongodb.net:27017/?ssl=true&replicaSet=atlas-iqe4sw-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";
const dbName = 'easypaisa_forms';
let client;
let db;
let isConnected = false;

export async function connectToDatabase() {
  if (isConnected && client && db) {
    return { client, db, isConnected: true };
  }

  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    isConnected = true;
    console.log('Connected to MongoDB Atlas');
    return { client, db, isConnected: true };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    isConnected = false;
    return { client: null, db: null, isConnected: false };
  }
}

export async function saveSubmission(submissionData) {
  try {
    const { db } = await connectToDatabase();
    if (!db) {
      throw new Error('Database not connected');
    }
    
    const collection = db.collection('submissions');
    const result = await collection.insertOne({
      ...submissionData,
      createdAt: new Date()
    });
    return result;
  } catch (error) {
    console.error('Error saving submission:', error);
    throw error;
  }
}

export async function getAllSubmissions() {
  try {
    const { db } = await connectToDatabase();
    if (!db) {
      throw new Error('Database not connected');
    }
    
    const collection = db.collection('submissions');
    const submissions = await collection.find({}).sort({ createdAt: -1 }).toArray();
    return submissions;
  } catch (error) {
    console.error('Error fetching submissions:', error);
    throw error;
  }
}

// Connect to database when the module is loaded
connectToDatabase();