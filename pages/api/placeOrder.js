// api/placeOrder.js
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { subTotal, shippingTotal, totalPayment, fullName, phoneNumber, address, cartItems } = req.body;

    try {
      // Connect to MongoDB
      const client = await MongoClient.connect('mongodb+srv://admin:0123456@leafyapp.b78yiqq.mongodb.net/');
      const db = client.db('leafy');

      // Insert data into MongoDB
      const billsCollection = db.collection('bills');
      await billsCollection.insertOne({
        fullName,
        phoneNumber,
        address,
        cartItems,
        subTotal,
        shippingTotal,
        totalPayment,
        createdAt: new Date()
      });

      client.close();

      res.status(201).json({ message: 'Order placed successfully!' });
    } catch (error) {
      console.error('Error placing order:', error.message);
      res.status(500).json({ message: 'Failed to place order' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
