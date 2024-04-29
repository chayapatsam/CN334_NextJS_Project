import Image from "next/image";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Leafy</title>
        <link href="https://fonts.googleapis.com/css2?family=Marcellus+SC&display=swap" rel="stylesheet" />
        <style>
          {`
            body {
              overflow: hidden;
            }
            .font-marcellus {
              font-family: 'Marcellus SC', serif;
            }
          `}
        </style>
      </Head>
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="flex justify-center">
            <Image src="/logo.png" width={320} height={320} alt="logo" className="mb-8" />
          </div>
          <p className="text-5xl mb-10 font-marcellus">
            Beauty of nature<br/>
            Decorate your home
          </p>
        </div>
      </div>
    </>
  );
}
