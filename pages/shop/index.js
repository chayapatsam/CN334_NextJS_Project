// pages/shop.js

import Head from "next/head";
import { MongoClient } from "mongodb";
import ItemBox from "@/components/ItemBox";

const Shop = ({ products }) => {
  return (
    <>
      <Head>
        <title>Shop | Leafy</title>
      </Head>
      <h1 className="text-3xl font-bold mb-8">สินค้าทั้งหมด</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ItemBox
            key={product._id}
            imageSrc={`/${product.id}.png`}
            productName={product.name}
            id={product.id}
            price={product.price}
          />
        ))}
      </div>
    </>
  );
};

export async function getServerSideProps() {
  // Connect to MongoDB
  const client = await MongoClient.connect("mongodb+srv://admin:0123456@leafyapp.b78yiqq.mongodb.net/");
  const db = client.db("leafy");

  // Fetch products from carts collection
  const cartsCollection = db.collection("products");
  const products = await cartsCollection.find({}).toArray();

  client.close();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

export default Shop;
