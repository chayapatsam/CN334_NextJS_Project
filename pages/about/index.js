// pages/about.js

import { MongoClient } from 'mongodb';
import Head from 'next/head';

export default function About({ products }) {
  return (
    <div>
      <Head>
        <title>About</title>
        <meta name="description" content="About page" />
      </Head>

      <h1>About Page</h1>

      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>Price: {product.price}</p>
            <p>Description: {product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  // Connect to MongoDB
  const client = await MongoClient.connect('mongodb+srv://admin:0123456@leafyapp.b78yiqq.mongodb.net/');
  const db = client.db('leafy'); // แก้ไขเป็นชื่อฐานข้อมูลของคุณ

  // Get data from MongoDB
  const productsCollection = db.collection('products');
  const products = await productsCollection.find({}).toArray();

  // Close MongoDB connection
  client.close();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)) // แปลง ObjectId เป็น string
    }
  };
}
