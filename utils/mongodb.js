import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://admin:0123456@leafyapp.b78yiqq.mongodb.net/';

const client = new MongoClient(uri);

let cachedDb = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    await client.connect();
    const db = client.db('leafy');
    cachedDb = db;
    return db;
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error;
  }
}
