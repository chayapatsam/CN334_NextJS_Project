import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { itemId } = req.body;

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db('leafy');

    const cartsCollection = db.collection('carts');
    await cartsCollection.deleteOne({ _id: new ObjectId(itemId) });

    const updatedCartItems = await cartsCollection.find({}).toArray();

    client.close();

    res.status(200).json(updatedCartItems);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
