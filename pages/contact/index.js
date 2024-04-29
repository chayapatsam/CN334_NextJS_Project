import Head from 'next/head';
import Image from 'next/image';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact | Leafy</title>
      </Head>
      <div className="flex items-left justify-start "> 
        <div className="text-center">
          <div className="flex items-left justify-start"> 
            <Image src="/contact.jpg" width={890} height={790} alt="pic" className="mr-20 mb-0 ml-0" />
            <div className='mt-40'>
              <p className="text-2xl font-bold mb-3 text-left ml-4 mt-20">Opening Hours</p>
              <p className="text-l mb-6 text-left ml-8"> 
                Mon - Fri: 8am - 8pm<br />
                Saturday: 9am - 7pm<br />
                Sunday: 9am - 8pm
              </p>
              <p className="text-2xl font-bold mb-3 text-left ml-4">Address</p>
              <p className="text-l mb-6 text-left ml-8"> 
                456 Oak Street, Green Valley<br />
                PathumThani, 12120<br />
                123-456-7890
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
