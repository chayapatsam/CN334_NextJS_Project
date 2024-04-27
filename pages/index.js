import Image from "next/image";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Leafy</title>
      </Head>
      <div className="flex items-center justify-center">
        <div className="text-center">
          <Image src="/logo.png" width={320} height={320} alt="logo" className="mt-10 mb-8" />
          <p className="text-xl mb-10">
            Beauty of nature<br/>
            Decorate your home
          </p>
        </div>
      </div>
    </>
  );
}
