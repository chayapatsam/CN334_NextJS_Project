// updateQuantity.js
import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { itemId, action } = req.body;

    // Connect to MongoDB
    const client = await MongoClient.connect('mongodb+srv://admin:0123456@leafyapp.b78yiqq.mongodb.net/');
    const db = client.db('leafy');

    // Get current quantity and itemTotalPrice from MongoDB
    const cartsCollection = db.collection('carts');
    const item = await cartsCollection.findOne({ _id: new ObjectId(itemId) });

    // Update quantity based on action
    let newQuantity = item.quantity;
    if (action === 'increase') {
      newQuantity += 1;
    } else if (action === 'decrease') {
      newQuantity -= 1;
    }

    // Calculate new itemTotalPrice
    const newItemTotalPrice = item.price * newQuantity;

    // Update quantity and itemTotalPrice in carts collection
    await cartsCollection.updateOne(
      { _id: new ObjectId(itemId) },
      { $set: { quantity: newQuantity, itemTotalPrice: newItemTotalPrice } }
    );

    // Get updated cart items
    const updatedCartItems = await cartsCollection.find({}).toArray();

    // Close MongoDB connection
    client.close();

    res.status(200).json(updatedCartItems);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
