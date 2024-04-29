// api/placeOrder.js
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { subTotal, shippingTotal, totalPayment, fullName, phoneNumber, address, cartItems } = req.body;

    try {
      // Connect to MongoDB
      const client = await MongoClient.connect('mongodb+srv://admin:0123456@leafyapp.b78yiqq.mongodb.net/');
      const db = client.db('leafy');
      const billsCollection = db.collection('bills');

      const currentDateTime = new Date();

      // Extract date and time
      const year = currentDateTime.getFullYear();
      const month = currentDateTime.getMonth() + 1; // Months start from 0
      const day = currentDateTime.getDate();
      const hours = currentDateTime.getHours();
      const minutes = currentDateTime.getMinutes();
      const seconds = currentDateTime.getSeconds();
      const milliseconds = currentDateTime.getMilliseconds();

      // Format date and time
      const dateOnly = `${year}-${(month < 10 ? '0' : '') + month}-${(day < 10 ? '0' : '') + day}`;
      const timeOnly = `${(hours < 10 ? '0' : '') + hours}:${(minutes < 10 ? '0' : '') + minutes}:${(seconds < 10 ? '0' : '') + seconds}.${(milliseconds < 100 ? '0' : '') + milliseconds}`;

      // แปลง subTotal, shippingTotal, และ totalPayment เป็น double
      const parsedSubTotal = parseFloat(subTotal);
      const parsedShippingTotal = parseFloat(shippingTotal);
      const parsedTotalPayment = parseFloat(totalPayment);

      await billsCollection.insertOne({
        fullName,
        phoneNumber,
        address,
        cartItems,
        subTotal: parsedSubTotal,
        shippingTotal: parsedShippingTotal,
        totalPayment: parsedTotalPayment,
        createdAt: {
          date: dateOnly,
          time: timeOnly
        }
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
