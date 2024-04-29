import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { MongoClient } from 'mongodb';
import Head from 'next/head';

export default function Checkout({ cartItems }) {
  const [shippingTotal, setShippingTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const router = useRouter();

  const handleCashOnDelivery = () => {
    event.preventDefault();
    setShippingTotal(10);
    setPaymentMethod('Cash on Delivery');
  };

  async function placeOrder() {
    // ตรวจสอบว่ามีข้อมูล Full Name, Phone Number, และ Delivery Address ถูกกรอกครบหรือไม่
    const fullNameInput = document.getElementById('fullName').value;
    const phoneNumberInput = document.getElementById('phoneNumber').value;
    const addressInput = document.getElementById('deliveryAddress').value;
  
    if (!fullNameInput || !phoneNumberInput || !addressInput) {
      alert('Please fill in all required fields.');
      return;
    }
  
    if (!paymentMethod || paymentMethod !== 'Cash on Delivery') {
      alert('Please select a payment method.');
      return;
    }
    
    try {
      const response = await fetch('/api/placeOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: fullNameInput,
          phoneNumber: phoneNumberInput,
          address: addressInput,
          cartItems: cartItems.map(item => ({ id: item.id, name: item.name, price: item.price, quantity: item.quantity, itemTotalPrice: item.itemTotalPrice})),
          subTotal: calculateTotalPrice(cartItems).merchandiseSubtotal,
          shippingTotal: shippingTotal,
          totalPayment: calculateTotalPrice(cartItems, shippingTotal).totalPayment,
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to place order');
      }
  
      await fetch('/api/resetCartItems', {
        method: 'DELETE'
      });
  
      // เมื่อสำเร็จในการสั่งซื้อ ทำการเปลี่ยนเส้นทางไปยังหน้า Home
      router.push('/');
  
      // แสดงการแจ้งเตือน
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error.message);
      // ในกรณีเกิดข้อผิดพลาด แสดงการแจ้งเตือน
      alert('Failed to place order. Please try again.');
    }
  }

  function calculateTotalPrice(cartItems, shippingTotal) {
    let merchandiseSubtotal = 0;
    cartItems.forEach(item => {
      merchandiseSubtotal += item.price * item.quantity;
    });

    const totalPayment = merchandiseSubtotal + shippingTotal;

    return {
      merchandiseSubtotal: merchandiseSubtotal.toFixed(2),
      totalPayment: totalPayment.toFixed(2)
    };
  }

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Checkout | Leafy</title>
        <meta name="description" content="Description of your dashboard page" />
      </Head>
      <div className="max-w-3xl mx-auto px-4 py-8 flex">
        {/* Cart Items */}
        <div className="w-1/2 pr-4">
          <h1 className="text-2xl font-semibold mb-4 border-b border-gray-800 pb-4 pt-4">Products Ordered</h1>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="border-b border-gray-800 pb-4 flex items-center">
                <img src={`/${item.id}.png`} alt={item.name} className="w-24 h-34 object-cover" />
                <div className="ml-5 flex-grow">
                  <p className="text-l font-semibold">{item.name}</p>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                <p className="ml-4 pr-2 pb-5">{item.quantity}</p>
                <p className="ml-4 pb-5">${item.itemTotalPrice}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Delivery Address and Payment Method */}
        <div className="w-1/2 pl-10">
          <h1 className="text-2xl font-semibold mb-4 border-b border-gray-800 pb-4 pt-4">Delivery Address</h1>
          <form>
            <div className="flex flex-col mb-4">
              <label htmlFor="fullName" className="mb-2">Full Name</label>
              <input type="text" id="fullName" name="fullName" className="border border-gray-300 px-4 py-2 rounded" />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="phoneNumber" className="mb-2">Phone Number</label>
              <input type="tel" id="phoneNumber" name="phoneNumber" className="border border-gray-300 px-4 py-2 rounded" />
            </div>
            <div className="flex flex-col mb-4 border-b border-gray-800 pb-4">
              <label htmlFor="deliveryAddress" className="mb-2">Delivery Address</label>
              <textarea id="deliveryAddress" name="deliveryAddress" rows="4" className="border border-gray-300 px-4 py-2 rounded"></textarea>
            </div>
          </form>
          
          {/* Payment Method */}
          <div className="mt-4">
            <h2 className="text-2xl font-semibold">Payment Method</h2>
            <button onClick={() => handleCashOnDelivery()} className="bg-gray-400 hover:bg-[#2E5F2A] active:bg-[#2E5F2A] text-white px-4 py-2 rounded mt-4">Cash on Delivery</button>
          </div>

          <div className="mt-4 border-t border-gray-800 pt-4 flex justify-between">
            <div>
              <p className="font-semibold">Merchandise Subtotal</p>
            </div>
            <div>
              <p className="text-l">${calculateTotalPrice(cartItems).merchandiseSubtotal}</p>
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <div>
              <p className="font-semibold">Shipping Total</p>
            </div>
            <div>
              <p className="text-l">${shippingTotal}</p>
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <div>
              <p className="font-semibold">Total Payment</p>
            </div>
            <div>
              <p className="text-l">${calculateTotalPrice(cartItems, shippingTotal).totalPayment}</p>
            </div>
          </div>
  
          {/* Place Order Button */}
          <div className="pt-4 pb-4">
            <button onClick={() => placeOrder()} className="bg-[#2E5F2A] text-white px-4 py-2 rounded">Place Order</button>
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
      cartItems: JSON.parse(JSON.stringify(cartItems))
    }
  };
}
