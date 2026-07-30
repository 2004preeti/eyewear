import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800 pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand Info */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/sunrise.png"
              alt="Sunrise Optical Logo"
              width={50}
              height={50}
              className="object-contain"
            />
            <h2 className="text-2xl font-extrabold tracking-tight">
              Sunrise <span className="text-yellow-500">Optical</span>
            </h2>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed mt-2">
            Premium Optical for everyone. We believe in clear vision and
            unmatched style.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Shop</h3>
          <ul className="space-y-3 text-gray-500 text-sm">
            <li>
              <Link href="/shop/eyeglasses" className="hover:text-yellow-500">
                Eyeglasses
              </Link>
            </li>
            <li>
              <Link href="/shop/sunglasses" className="hover:text-yellow-500">
                Sunglasses
              </Link>
            </li>
            <li>
              <Link href="/shop/computer" className="hover:text-yellow-500">
                Computer Glasses
              </Link>
            </li>
            <li>
              <Link href="/shop/lenses" className="hover:text-yellow-500">
                Contact Lenses
              </Link>
            </li>
          </ul>
        </div>

        {/* Help & Support - UPDATED WITH LINKS */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Help & Support</h3>
          <ul className="space-y-3 text-gray-500 text-sm">
            <li>
              <Link href="#" className="hover:text-yellow-500">
                Track Order
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-yellow-500">
                Return Policy
              </Link>
            </li>
            <li>
              <Link href="/store" className="hover:text-yellow-500">
                Store location
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-yellow-500">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Stay in the Loop</h3>
          <p className="text-gray-500 text-sm mb-4">
            Subscribe for exclusive offers and updates.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-l-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-black focus:outline-none focus:border-yellow-500"
            />
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-r-md transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 text-center border-t border-gray-200 dark:border-zinc-800 pt-8 text-gray-400 text-sm">
        <p>
          © {new Date().getFullYear()} Sunrise Optical. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
