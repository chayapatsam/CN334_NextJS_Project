// pages/shop.js

import Head from "next/head";
import ItemBox from "@/components/ItemBox";

const Shop = () => {
  return (
    <>
      <Head>
        <title>Shop | Leafy</title>
      </Head>
      <h1 className="text-3xl font-bold mb-8">สินค้าทั้งหมด</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ItemBox imageSrc="/boston-fern.png" productName="Boston Fern" id="boston-fern" />
        <ItemBox imageSrc="/monstera.png" productName="Monstera" id="monstera" />
        <ItemBox imageSrc="/peace-lily.png" productName="Peace Lily" id="peace-lily" />
        <ItemBox imageSrc="/english-ivy.png" productName="English Ivy" id="english-ivy" />
      </div>
    </>
  );
};

export default Shop;
