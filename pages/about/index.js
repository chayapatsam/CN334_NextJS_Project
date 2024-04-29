import Head from 'next/head';
import Image from 'next/image';

export default function About() {
    return (
        <>
            <Head>
                <title>About | Leafy</title>
                <meta name="description" content="Discover the essence of verdant living at Leafy, a sanctuary of plant diversity." />
            </Head>
            <div className="flex justify-center items-center h-[500px] mt-10">
                <div className="mr-5 flex-shrink-0">
                    <Image src="/about.jpg" width={600} height={800} alt="Leafy Plant Nursery" />
                </div>
                <div className="text-left max-w-lg">
                    <h1 className="text-2xl font-bold mb-2.5">About Us</h1>
                    <p className="mb-4">Discover the essence of verdant living at Leafy, established in 2024 as a sanctuary of plant diversity. With a decade's expertise in horticulture, we are your guide to cultivating your own slice of nature. Leafy curates a selection of plants that flourish in Thailand's unique climate, from blooming beauties to lush foliage.</p>
                    <p className="mb-4">Join us in the belief that plants are the soul of a home, enriching spaces with vibrancy and tranquility. Whether for home, garden, or office, let Leafy be your partner in greening your world.</p>
                    <p className="mb-4">Explore Leafy's realm of greenery and gather insights from our experts for a thriving plant life.</p>
                </div>
            </div>
        </>
    )
}
