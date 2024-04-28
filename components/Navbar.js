import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  // Helper function to determine if the link is active
  const isActive = (path) => {
    return router.pathname === path;
  };

  return (
    <nav className="bg-[#374536] py-4 flex items-center justify-between">
      <div className="space-x-6 ml-8">
        <Link href="/" passHref>
          <span className={`cursor-pointer text-white  ${isActive('/') ? 'border-b-2 border-white' : 'hover:text-white-500 border-b border-transparent '}`}>Home</span>
        </Link>
        <Link href="/shop" passHref>
          <span className={`cursor-pointer text-white  ${isActive('/shop') ? 'border-b-2 border-white' : 'hover:text-white-500 border-b border-transparent '}`}>Shop</span>
        </Link>
        <Link href="/about" passHref>
          <span className={`cursor-pointer text-white  ${isActive('/about') ? 'border-b-2 border-white' : 'hover:text-white-500 border-b border-transparent '}`}>About</span>
        </Link>
        <Link href="/contact" passHref>
          <span className={`cursor-pointer text-white   ${isActive('/contact') ? 'border-b-2 border-white' : 'hover:text-white-500 border-b border-transparent '}`}>Contact</span>
        </Link>
      </div>
      <div className="pr-8">
        <Link href="/cart" passHref>
          <span className="cursor-pointer">
            <Image src="/cart.png" width={40} height={40} alt="cart" />
          </span>
        </Link>
      </div>
    </nav>
  );
}
