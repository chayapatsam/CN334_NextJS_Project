// pages/dashboard.js
import Head from 'next/head';
import { MongoClient } from 'mongodb';
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import Image from 'next/image';

export default function Dashboard({ productQuantities, totalOrders, totalPayment, dailySales }) {
  const productChartRef = useRef(null);
  const dailySalesChartRef = useRef(null);

  useEffect(() => {
    if (productChartRef.current !== null) {
      productChartRef.current.destroy();
    }

    const productCtx = document.getElementById('productChart').getContext('2d');
    productChartRef.current = new Chart(productCtx, {
      type: 'bar',
      data: {
        labels: Object.keys(productQuantities),
        datasets: [{
          label: 'Product Quantities',
          data: Object.values(productQuantities),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    if (dailySalesChartRef.current !== null) {
      dailySalesChartRef.current.destroy();
    }

    const dailySalesCtx = document.getElementById('dailySalesChart').getContext('2d');
    dailySalesChartRef.current = new Chart(dailySalesCtx, {
      type: 'line',
      data: {
        labels: dailySales.map(sale => sale._id), // Dates
        datasets: [{
          label: 'Daily Sales',
          data: dailySales.map(sale => sale.totalSales), // Total sales for each date
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    return () => {
      if (productChartRef.current !== null) {
        productChartRef.current.destroy();
      }
      if (dailySalesChartRef.current !== null) {
        dailySalesChartRef.current.destroy();
      }
    };
  }, [productQuantities, dailySales]);

  return (
    <div className="flex flex-col items-center justify-center">
    <Head>
        <title>Dashboard | Leafy</title>
        <meta name="description" content="Description of your dashboard page" />
    </Head>
    <h1 className='text-center font-semibold text-3xl mt-8 mb-2'>Dashboard</h1>
    <div className="grid grid-cols-2 gap-8">
        <div className="space-x-3 bg-[#2E5F2A] text-white p-5 rounded-lg mt-5 flex items-center justify-center">
          <Image src="/order.png" width={30} height={30} alt="order"/>
          <h1>Total Orders: {totalOrders}</h1>
        </div>
        <div className="space-x-3 bg-[#2E5F2A] text-white p-5 rounded-lg mt-5 flex items-center justify-center">
          <Image src="/money.png" width={30} height={30} alt="money"/>
          <h1>Total sales: {totalPayment.toFixed(2)}</h1>
        </div>
    </div>
    <div className="flex items-center justify-center">
        <div className="m-10">
        <h2 className="text-xl font-semibold mb-4">Quantity of Sales</h2>
        <canvas id="productChart" className="w-96 h-72"></canvas>
        </div>
        <div className="m-10">
        <h2 className="text-xl font-semibold mb-4">Weekly Sales</h2>
        <canvas id="dailySalesChart" className="w-96 h-72"></canvas>
        </div>
    </div>
    </div>
  );  
}

export async function getServerSideProps() {
  // Connect to MongoDB
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('leafy');
  const billsCollection = db.collection('bills');
  const productsCollection = db.collection('products');

  // Function to calculate daily sales
  async function calculateDailySales() {
    // Aggregate to group totalPayment by date and sum it up
    const dailySalesResult = await billsCollection.aggregate([
      {
        $group: {
          _id: '$createdAt.date', // Group by date
          totalSales: { $sum: '$totalPayment' } // Sum up totalPayment for each date
        }
      },
      {
        $sort: { _id: -1 } // Sort by date in descending order
      },
      {
        $limit: 7 // Limit the result to the latest 7 documents (7 days)
      }
    ]).toArray();

    // Reverse the array to display the latest data first
    dailySalesResult.reverse();

    return dailySalesResult;
  }

  // Fetch other data for the dashboard
  const [productQuantityResult, products, totalPaymentResult] = await Promise.all([
    // Calculate product quantities
    billsCollection.aggregate([
      {
        $unwind: '$cartItems'
      },
      {
        $group: {
          _id: '$cartItems.name',
          totalQuantity: { $sum: '$cartItems.quantity' }
        }
      }
    ]).toArray(),
    // Fetch products
    productsCollection.find({}).toArray(),
    // Calculate total payment
    billsCollection.aggregate([
      {
        $group: {
          _id: null,
          totalPayment: { $sum: '$totalPayment' }
        }
      }
    ]).toArray()
  ]);

  // Calculate daily sales
  const dailySales = await calculateDailySales();

  // Process product quantities
  const productQuantities = {};
  products.forEach(product => {
    productQuantities[product.name] = 0;
  });
  productQuantityResult.forEach(item => {
    productQuantities[item._id] = item.totalQuantity;
  });

  // Extract total payment
  const totalPayment = totalPaymentResult.length > 0 ? totalPaymentResult[0].totalPayment : 0;

  // Count total orders
  const totalOrders = await billsCollection.countDocuments();

  // Close MongoDB connection
  client.close();

  return {
    props: {
      productQuantities: productQuantities,
      totalOrders: totalOrders,
      totalPayment: totalPayment,
      dailySales: dailySales
    },
  };
}
