// pages/products/[id].js

import { MongoClient } from 'mongodb';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import QuantityButton from '@/components/QuantityButton';
import AddToCartButton from '@/components/AddToCartButton';
import { fetchTagSuggestions } from '@/utils/tagSuggestions'; // นำเข้าฟังก์ชัน fetchTagSuggestions

export default function Product({ product, tagSuggestions }) { // นำเข้า tagSuggestions มาจาก getServerSideProps
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const [productAdded, setProductAdded] = useState(false);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = async () => {
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
      }),
    });

    if (response.ok) {
      // window.alert('Product has been added to your cart.');
      // router.push('/cart');
      setProductAdded(true); // เปลี่ยนค่า productAdded เป็น true เมื่อสินค้าถูกเพิ่มลงในตะกร้า
    } else {
      console.error('Failed to add product to cart');
    }
  };

  return (
    <div className="container mx-auto mt-8 mb-10">
      <Head>
        <title>{product.name} | Leafy</title>
        <meta name="description" content={product.description} />
      </Head>
      <div className="flex flex-col md:flex-row items-center justify-center md:space-x-10 p-10">
        <div className="mb-6 md:mb-0">
          <img src={`/${product.id}.png`} alt={product.name} className="object-contain h-85 w-full md:w-80" />
        </div>
        <div className="text-left">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl mb-4">${product.price}</p>
          <p className="text-gray-500 mb-4 max-w-[30rem]">{product.description}</p>
          <div className="mb-2 flex flex-wrap items-center">
            <p className="mr-1">Tag Suggestions:</p>
            <ul className="flex flex-wrap gap-1">
              {tagSuggestions.map((item, index) => (
                <li key={index} className="mr-1">{item.tag}{index !== tagSuggestions.length - 1 ? ',' : ''}</li>
              ))}
            </ul>
          </div>
          <div className="my-4">
            <p className="text-md font-medium mb-2">Quantity</p>
            <QuantityButton
              quantity={quantity}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          </div>
          <AddToCartButton onClick={handleAddToCart} />
          <div className="text-green-500 h-6 mt-1">
            {productAdded && <p>Product has been added to your cart.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}  

export async function getServerSideProps(context) {
  const { id } = context.params;

  // Connect to MongoDB
  const client = await MongoClient.connect('mongodb+srv://admin:0123456@leafyapp.b78yiqq.mongodb.net/');
  const db = client.db('leafy');

  // Get data from MongoDB
  const productsCollection = db.collection('products');
  const product = await productsCollection.findOne({ id: id });

  // Fetch tag suggestions
  const tagSuggestions = await fetchTagSuggestions(product.description);

  // Close MongoDB connection
  client.close();

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      tagSuggestions: tagSuggestions
    }
  };
}
