import Head from 'next/head';
import '@/styles/globals.css';
import Layout from '@/components/Layout';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
