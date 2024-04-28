// pages/dashboard.js
import Head from 'next/head';
import { MongoClient } from 'mongodb';

export default function Dashboard({ productQuantities, totalOrders, totalPayment }) {
  return (
    <div>
      <Head>
        <title>Dashboard | Leafy</title>
        <meta name="description" content="Description of your dashboard page" />
      </Head>
      <h1 className='text-center font-semibold text-3xl mt-8 mb-2'>Dashboard</h1>
      <div className="flex items-center justify-center text-center">
        <div className="bg-green-800 text-white p-5 rounded-lg m-5 w-1/5">
          <h1>Total Orders: {totalOrders}</h1>
        </div>
        <div className="bg-green-800 text-white p-5 rounded-lg m-5 w-1/5">
          <h1>Total Payment: {totalPayment}</h1>
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        {Object.keys(productQuantities).map((productName, index) => (
          <div key={index} className="bg-blue-800 text-white p-5 rounded-lg m-5 w-1/5">
            <h1>{productName}: {productQuantities[productName]}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const client = await MongoClient.connect('mongodb+srv://admin:0123456@leafyapp.b78yiqq.mongodb.net/');
  const db = client.db('leafy');

  const billsCollection = db.collection('bills');
  const productsCollection = db.collection('products');

  // ใช้ aggregation framework เพื่อหาข้อมูล quantity ทั้งหมดของแต่ละสินค้าแยกตามชื่อของสินค้า
  const productQuantityResult = await billsCollection.aggregate([
    {
      $unwind: "$cartItems"
    },
    {
      $group: {
        _id: "$cartItems.name",
        totalQuantity: { $sum: "$cartItems.quantity" }
      }
    }
  ]).toArray();

  // ดึงข้อมูลสินค้าทั้งหมดจาก collection products
  const products = await productsCollection.find({}).toArray();

  // สร้าง object เพื่อเก็บข้อมูล quantity ของแต่ละสินค้า และกำหนดค่าเริ่มต้นเป็น 0
  const productQuantities = {};
  products.forEach(product => {
    productQuantities[product.name] = 0;
  });

  // นับสินค้าที่ถูกซื้อมา
  productQuantityResult.forEach(item => {
    productQuantities[item._id] = item.totalQuantity;
  });

  // ถ้ามีผลรวมของ totalPayment จะเป็น array ที่มีขนาดเท่ากับ 1
  // ฉะนั้นเราต้องตรวจสอบว่ามีข้อมูลหรือไม่ก่อนที่จะดึงค่า totalPayment ออกมา
  const totalPaymentResult = await billsCollection.aggregate([
    {
      $group: {
        _id: null,
        totalPayment: { $sum: "$totalPayment" }
      }
    }
  ]).toArray();
  const totalPayment = totalPaymentResult.length > 0 ? totalPaymentResult[0].totalPayment : 0;

  const totalOrders = await billsCollection.countDocuments();

  client.close();

  return {
    props: {
      productQuantities: productQuantities,
      totalOrders: totalOrders,
      totalPayment: totalPayment
    },
  };
}
