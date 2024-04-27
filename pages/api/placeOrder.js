import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { subTotal, shippingTotal, totalPayment } = req.body;

    // Connect to MongoDB
    const client = await MongoClient.connect('mongodb+srv://admin:0123456@leafyapp.b78yiqq.mongodb.net/');
    const db = client.db('leafy');

    // Insert data into MongoDB
    const billsCollection = db.collection('bills');
    await billsCollection.insertOne({
      subTotal,
      shippingTotal,
      totalPayment,
      createdAt: new Date()
    });

    client.close();

    res.status(201).json({ message: 'Order placed successfully!' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
