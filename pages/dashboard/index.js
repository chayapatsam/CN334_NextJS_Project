// pages/dashboard.js
import Head from 'next/head';
import { MongoClient } from 'mongodb';

export default function Dashboard({ totalOrders, totalPayment }) {
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
      </div>
    );
  }  

export async function getServerSideProps() {
    const client = await MongoClient.connect('mongodb+srv://admin:0123456@leafyapp.b78yiqq.mongodb.net/');
    const db = client.db('leafy');
  
    const billsCollection = db.collection('bills');
  
    // ใช้ aggregation framework เพื่อหาผลรวมของ totalPayment
    const totalPaymentResult = await billsCollection.aggregate([
      {
        $group: {
          _id: null,
          totalPayment: { $sum: "$totalPayment" } // สร้าง field totalPayment ที่เก็บผลรวมของ totalPayment ของทุกเอกสาร
        }
      }
    ]).toArray();
  
    const totalOrders = await billsCollection.countDocuments();
  
    client.close();
  
    // ถ้ามีผลรวมของ totalPayment จะเป็น array ที่มีขนาดเท่ากับ 1
    // ฉะนั้นเราต้องตรวจสอบว่ามีข้อมูลหรือไม่ก่อนที่จะดึงค่า totalPayment ออกมา
    const totalPayment = totalPaymentResult.length > 0 ? totalPaymentResult[0].totalPayment : 0;
  
    return {
      props: {
        totalOrders: totalOrders,
        totalPayment: totalPayment
      },
    };
  }
  
