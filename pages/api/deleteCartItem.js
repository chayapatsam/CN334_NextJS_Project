import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { itemId } = req.body;

    // Connect to MongoDB
    const client = await MongoClient.connect('mongodb+srv://admin:0123456@leafyapp.b78yiqq.mongodb.net/');
    const db = client.db('leafy');

    // Delete item from carts collection
    const cartsCollection = db.collection('carts');
    await cartsCollection.deleteOne({ _id: new ObjectId(itemId) });

    // Get updated cart items
    const updatedCartItems = await cartsCollection.find({}).toArray();

    // Close MongoDB connection
    client.close();

    res.status(200).json(updatedCartItems);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
