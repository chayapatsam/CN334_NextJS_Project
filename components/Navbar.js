import Link from "next/link"
import Image from "next/image"

export default function Navbar(){
  return(
    <nav className="bg-[#374536] py-4 flex items-center justify-between">
      <div className="space-x-6 ml-8">
        <Link href="/" className="text-white hover:text-green-500 transition duration-300 border-b border-transparent hover:border-green-500">Home</Link>
        <Link href="/shop" className="text-white hover:text-green-500 transition duration-300 border-b border-transparent hover:border-green-500">Shop</Link>
        <Link href="/about" className="text-white hover:text-green-500 transition duration-300 border-b border-transparent hover:border-green-500">About</Link>
        <Link href="/contact" className="text-white hover:text-green-500 transition duration-300 border-b border-transparent hover:border-green-500">Contact</Link>
      </div>
      <div className="pr-8">
        <Link href="/cart"><Image src="/cart.png" width={40} height={450} alt="logo"/></Link>
      </div>
    </nav>
  )
}
