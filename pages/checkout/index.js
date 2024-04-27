import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { MongoClient } from 'mongodb';

export default function Checkout({ cartItems }) {
  const [shippingTotal, setShippingTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const router = useRouter();

  const handleCashOnDelivery = () => {
    setShippingTotal(10);
    setPaymentMethod('Cash on Delivery');
  };

  async function placeOrder() {
    if (!paymentMethod || paymentMethod !== 'Cash on Delivery') {
      alert('Please select a payment method.');
      return;
    }
    
    try {
      // ส่วนของโค้ดส่งคำสั่งไปยัง API นี่
      const response = await fetch('/api/placeOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subTotal: calculateTotalPrice(cartItems).merchandiseSubtotal,
          shippingTotal: shippingTotal,
          totalPayment: calculateTotalPrice(cartItems, shippingTotal).totalPayment
        })
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      // ลบข้อมูลใน collection carts
      await fetch('/api/resetCartItems', {
        method: 'DELETE'
      });

      // เรียกใช้เมทอดการเปลี่ยนเส้นทาง
      router.push('/')
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error.message);
    }
  }

  function calculateTotalPrice(cartItems, shippingTotal) {
    let merchandiseSubtotal = 0;
    cartItems.forEach(item => {
      merchandiseSubtotal += item.price * item.quantity;
    });

    const totalPayment = merchandiseSubtotal + shippingTotal;

    return {
      merchandiseSubtotal: merchandiseSubtotal,
      totalPayment: totalPayment
    };
  }

  return (
    <div className="bg-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-4 border-b border-gray-800 pb-4 pt-4">Checkout</h1>
        
        {/* Cart Items */}
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
        
        {/* Delivery Address */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold border-b border-gray-800 pt-4 pb-4">Delivery Address</h2>
          <form>
            <div className="flex flex-col mb-4">
              <label htmlFor="fullName" className="mb-2 font-semibold">Full Name</label>
              <input type="text" id="fullName" name="fullName" className="border border-gray-300 px-4 py-2 rounded" />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="phoneNumber" className="mb-2 font-semibold">Phone Number</label>
              <input type="tel" id="phoneNumber" name="phoneNumber" className="border border-gray-300 px-4 py-2 rounded" />
            </div>
            <div className="flex flex-col mb-4 border-b border-gray-800 pt-4 pb-4">
              <label htmlFor="deliveryAddress" className="mb-2 font-semibold">Delivery Address</label>
              <textarea id="deliveryAddress" name="deliveryAddress" rows="4" className="border border-gray-300 px-4 py-2 rounded"></textarea>
            </div>
          </form>
        </div>
        
        {/* Payment Method */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Payment Method</h2>
          <button onClick={() => handleCashOnDelivery()} className="bg-green-500 text-white px-4 py-2 rounded mt-4">Cash on Delivery</button>
        </div>
        
        {/* Merchandise Subtotal and Total Payment */}
        <div className="border-t border-gray-800 mt-8 mb-4">
          <p className="text-xl pt-4 pb-4">Merchandise Subtotal: ${calculateTotalPrice(cartItems).merchandiseSubtotal}</p>
          <p className="text-xl pt-4 pb-4">Shipping Total: ${shippingTotal}</p>
          <p className="text-xl pt-4 pb-4">Total Payment: ${calculateTotalPrice(cartItems, shippingTotal).totalPayment}</p>

          <button onClick={() => placeOrder()} className="bg-blue-500 text-white px-4 py-2 rounded">Place Order</button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const client = await MongoClient.connect('mongodb+srv://admin:0123456@leafyapp.b78yiqq.mongodb.net/');
  const db = client.db('leafy');

  const cartsCollection = db.collection('carts');
  const cartItems = await cartsCollection.find({}).toArray();

  client.close();

  return {
    props: {
      cartItems: JSON.parse(JSON.stringify(cartItems))
    }
  };
}
