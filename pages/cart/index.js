// pages/cart/index.js
import React, { useState } from 'react';
import { MongoClient } from 'mongodb';
import QuantityButton2 from '@/components/QuantityButton2';
import Link from 'next/link';
import Head from 'next/head';

export default function Cart({ initialCartItems }) {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleIncrease = async (itemId) => {
    const response = await fetch('/api/updateQuantity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        itemId: itemId,
        action: 'increase'
      }),
    });

    if (response.ok) {
      const updatedCartItems = await response.json();
      setCartItems(updatedCartItems);
    }
  };

  const handleDecrease = async (itemId) => {
    const currentItem = cartItems.find(item => item._id === itemId);
    if (currentItem.quantity <= 1) {
      return;
    }
  
    const response = await fetch('/api/updateQuantity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        itemId: itemId,
        action: 'decrease'
      }),
    });
  
    if (response.ok) {
      const updatedCartItems = await response.json();
      setCartItems(updatedCartItems);
    }
  };  

  const handleDelete = async (itemId) => {
    const response = await fetch('/api/deleteCartItem', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        itemId: itemId,
      }),
    });

    if (response.ok) {
      const updatedCartItems = await response.json();
      setCartItems(updatedCartItems);
    }
  };

  const calculateTotalPrice = () => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.price * item.quantity;
    });
    return total.toFixed(2);
  };

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Cart | Leafy</title>
        <meta name="description" content="Description of your dashboard page" />
      </Head>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          {/* Shopping Cart */}
          <div className="md:flex-grow">
            <h1 className="text-2xl font-semibold mb-4 border-b border-gray-800 pb-4 pt-4">Shopping Cart</h1>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="border-b border-gray-800 pb-4 flex items-center">
                  <img src={`/${item.id}.png`} alt={item.name} className="w-24 h-34 object-cover" />
                  <div className="ml-5 flex-grow">
                    <p className="text-l font-semibold">{item.name}</p>
                    <p className="text-gray-600">${item.price}</p>
                  </div>
                  <div className="flex items-center pb-5">
                    <QuantityButton2
                      quantity={item.quantity}
                      onIncrease={() => handleIncrease(item._id)}
                      onDecrease={() => handleDecrease(item._id)}
                    />
                    <p className="ml-8">${item.itemTotalPrice.toFixed(2)}</p>
                    <button onClick={() => handleDelete(item._id)} className="ml-8 text-gray-500 pb-1">x</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Order Summary */}
          <div className="md:ml-10">
            <h2 className="text-2xl font-semibold border-b border-gray-800 pt-4 pb-4">Order Summary</h2>
            <div className="flex items-center pb-6">
              <p className="text-sm pt-4 pb-4">Subtotal</p>
              <p className="text-right flex-grow">${calculateTotalPrice()}</p>
            </div>
            <div className="flex items-center border-t border-gray-800 pt-4 pb-4">
              <p className="text-l">Total</p>
              <p className="text-right flex-grow">${calculateTotalPrice()}</p>
            </div>
            <Link href="/checkout">
              <button className="bg-[#2E5F2A] text-white px-20 py-1 rounded ">Checkout</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );  
}

export async function getServerSideProps() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('leafy');

  const cartsCollection = db.collection('carts');
  const cartItems = await cartsCollection.find({}).toArray();

  client.close();

  return {
    props: {
      initialCartItems: JSON.parse(JSON.stringify(cartItems))
    }
  };
}
