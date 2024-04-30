import Head from "next/head";
import { MongoClient } from "mongodb";
import ItemBox from "@/components/ItemBox";

const Shop = ({ products }) => {
  return (
    <>
      <Head>
        <title>Shop | Leafy</title>
      </Head>
      <h1 className="text-3xl font-bold mt-8 mb-10 text-center">Plant</h1> 
    <div className ="block-shop">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db("leafy");

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
