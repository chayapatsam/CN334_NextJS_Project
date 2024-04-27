// pages/checkout/index.js
import React from 'react';
import { MongoClient } from 'mongodb';

export default function Checkout({ cartItems }) {
  return (
    <div className="bg-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-4 border-b border-gray-800 pb-4 pt-4">Checkout</h1>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="border-b border-gray-800 pb-4 pt-4 flex items-center">
              <img src={`/${item.id}.png`} alt={item.name} className="w-24 h-34 object-cover" />
              <div className="ml-4 flex-grow">
                <p className="text-xl font-semibold">{item.name}</p>
                <p className="text-gray-600">${item.price}</p>
              </div>
              <p className="ml-4">{item.quantity}</p>
              <p className="ml-4">${item.itemTotalPrice}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold border-b border-gray-800 pt-4 pb-4">Order Summary</h2>
          <p className="text-xl pt-4 pb-4">Total Price: ${calculateTotalPrice(cartItems)}</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Place Order</button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  // Connect to MongoDB
  const client = await MongoClient.connect('mongodb+srv://admin:0123456@leafyapp.b78yiqq.mongodb.net/');
  const db = client.db('leafy');

  // Get data from MongoDB
  const cartsCollection = db.collection('carts');
  const cartItems = await cartsCollection.find({}).toArray();

  // Close MongoDB connection
  client.close();

  return {
    props: {
      cartItems: JSON.parse(JSON.stringify(cartItems))
    }
  };
}

function calculateTotalPrice(cartItems) {
  let total = 0;
  cartItems.forEach(item => {
    total += item.price * item.quantity;
  });
  return total;
}
