'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 transition-all">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/sunrise.png"
            alt="Sunrise Optical Logo"
            width={45}
            height={45}
          />
          <span className="text-xl font-extrabold tracking-tighter">
            SUNRISE <span className="text-yellow-500">OPTICAL</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 font-medium text-sm uppercase tracking-wider">
          <Link
            href="/shop/eyeglasses"
            className="hover:text-yellow-500 transition-colors"
          >
            Eyeglasses
          </Link>
          <Link
            href="/shop/sunglasses"
            className="hover:text-yellow-500 transition-colors"
          >
            Sunglasses
          </Link>
          <Link
            href="/shop/computer"
            className="hover:text-yellow-500 transition-colors"
          >
            Computer
          </Link>
          <Link
            href="/shop/lenses"
            className="hover:text-yellow-500 transition-colors"
          >
            Lenses
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <Link href="/search" className="p-2 hover:text-yellow-500">
            🔍
          </Link>
          <Link href="/cart" className="p-2 hover:text-yellow-500">
            🛒
          </Link>
          <Link
            href="/login"
            className="hidden md:block bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-full font-bold hover:bg-yellow-500 hover:text-black transition-all"
          >
            Login
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-white dark:bg-black border-b border-gray-200 p-6 flex flex-col gap-4 animate-in slide-in-from-top-5">
          <Link href="/shop/eyeglasses" onClick={() => setIsOpen(false)}>
            Eyeglasses
          </Link>
          <Link href="/shop/sunglasses" onClick={() => setIsOpen(false)}>
            Sunglasses
          </Link>
          <Link href="/shop/computer" onClick={() => setIsOpen(false)}>
            Computer
          </Link>
          <Link href="/shop/lenses" onClick={() => setIsOpen(false)}>
            Lenses
          </Link>
          <Link
            href="/login"
            className="bg-yellow-500 text-black py-3 text-center rounded-lg font-bold"
          >
            Login / Signup
          </Link>
        </div>
      )}
    </header>
  );
}
