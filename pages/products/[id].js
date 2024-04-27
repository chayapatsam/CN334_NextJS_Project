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
      // router.push('/cart');
    } else {
      console.error('Failed to add product to cart');
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Head>
        <title>Products | Leafy</title>
        <meta name="description" content={product.description} />
      </Head>
      <div className="text-center m-10">
        <img src={`/${product.id}.png`} alt={product.name} className="w-auto h-auto object-contain" />
      </div>
      <div className="ml-8">
        <p className="text-xl font-semibold mb-2">Name: {product.name}</p>
        <p className="max-w-[30rem] mb-2">{product.description}</p>
        <div className="mb-2 flex flex-wrap items-center">
          <p className="mr-1">Tag Suggestions:</p>
          <ul className="flex flex-wrap gap-1">
            {tagSuggestions.map((tag, index) => (
              <li key={index} className="mr-1">{tag.tag}{index !== tagSuggestions.length - 1 && ','}</li>
            ))}
          </ul>
        </div>
        <p className="text-xl font-semibold mb-2">Price: {product.price}</p>
        <QuantityButton
          quantity={quantity}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />
        <AddToCartButton onClick={handleAddToCart} />
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
