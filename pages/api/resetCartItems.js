// api/resetCartItems.js
import { MongoClient } from 'mongodb';

// Connect to MongoDB
let client = null;

async function connectToDatabase() {
  if (!client) {
    client = await MongoClient.connect('mongodb+srv://admin:0123456@leafyapp.b78yiqq.mongodb.net/');
  }
  return client.db('leafy');
}

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    try {
      const db = await connectToDatabase();
      // Delete all documents in carts collection
      await db.collection('carts').deleteMany({});

      res.status(200).json({ message: 'Cart items deleted successfully!' });
    } catch (error) {
      console.error('Error deleting cart items:', error.message);
      res.status(500).json({ message: 'Failed to delete cart items' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
