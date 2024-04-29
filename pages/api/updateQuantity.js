import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { itemId, action } = req.body;

    const client = await MongoClient.connect('mongodb+srv://admin:0123456@leafyapp.b78yiqq.mongodb.net/');
    const db = client.db('leafy');

    const cartsCollection = db.collection('carts');
    const item = await cartsCollection.findOne({ _id: new ObjectId(itemId) });

    // Update quantity
    let newQuantity = item.quantity;
    if (action === 'increase') {
      newQuantity += 1;
    } else if (action === 'decrease') {
      newQuantity -= 1;
    }

    const newItemTotalPrice = item.price * newQuantity;

    // Update quantity and itemTotalPrice
    await cartsCollection.updateOne(
      { _id: new ObjectId(itemId) },
      { $set: { quantity: newQuantity, itemTotalPrice: newItemTotalPrice } }
    );

    // updated cart items
    const updatedCartItems = await cartsCollection.find({}).toArray();

    client.close();

    res.status(200).json(updatedCartItems);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
