'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll effect for dynamic shadow & glass intensity
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/75 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border-b border-white/40'
          : 'bg-white/60 backdrop-blur-xl border-b border-gray-100/60'
      }`}
    >
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-900 to-slate-900 text-amber-200 text-xs font-semibold py-1.5 text-center tracking-wider uppercase">
        ✨ Complimentary Anti-Glare Coating on All Premium Orders
      </div>

      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 p-1 flex items-center justify-center border border-amber-500/20 shadow-inner group-hover:scale-105 transition-transform duration-300">
            <Image
              src="/sunrise.png"
              alt="Sunrise Optical Logo"
              width={38}
              height={38}
              className="object-contain drop-shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-1">
              SUNRISE{' '}
              <span className="text-amber-500 font-extrabold">OPTICAL</span>
            </span>
            <span className="text-[10px] tracking-widest text-slate-400 font-semibold uppercase -mt-1">
              Luxury Eyewear
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION MENU */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/60 p-1.5 rounded-full  border border-slate-200/50 backdrop-blur-md shadow-inner">
          <Link
            href="/shop/eyeglasses"
            className="px-5 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-white rounded-full transition-all duration-300 uppercase tracking-wider hover:shadow-sm"
          >
            Eyeglasses
          </Link>
          <Link
            href="/shop/sunglasses"
            className="px-5 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-white rounded-full transition-all duration-300 uppercase tracking-wider hover:shadow-sm"
          >
            Sunglasses
          </Link>
          <Link
            href="/shop/computer"
            className="px-5 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-white rounded-full transition-all duration-300 uppercase tracking-wider hover:shadow-sm"
          >
            Computer
          </Link>

          {/* AUDIENCE COLLECTIONS */}
          <span className="h-4 w-[1px] bg-slate-300/60 mx-1"></span>

          <Link
            href="/shop/men"
            className="px-4 py-2 text-xs font-extrabold text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-full transition-all duration-300 uppercase tracking-wider"
          >
            Men
          </Link>
          <Link
            href="/shop/women"
            className="px-4 py-2 text-xs font-extrabold text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-full transition-all duration-300 uppercase tracking-wider"
          >
            Women
          </Link>
          <Link
            href="/shop/kids"
            className="px-4 py-2 text-xs font-extrabold text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-full transition-all duration-300 uppercase tracking-wider"
          >
            Kids
          </Link>
        </nav>

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex items-center gap-3">
          {/* Search Button */}
          <Link
            href="/search"
            className="w-10 h-10 rounded-full bg-slate-100/80 hover:bg-slate-900 hover:text-white transition-all duration-300 flex items-center justify-center text-slate-700 shadow-sm border border-slate-200/50"
            aria-label="Search"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </Link>

          {/* Cart Button */}
          <Link
            href="/cart"
            className="relative w-10 h-10 rounded-full bg-slate-100/80 hover:bg-slate-900 hover:text-white transition-all duration-300 flex items-center justify-center text-slate-700 shadow-sm border border-slate-200/50 group"
            aria-label="Cart"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-md border border-white">
              0
            </span>
          </Link>

          {/* Login Button */}
          <Link
            href="/login"
            className="hidden md:inline-flex items-center justify-center bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-amber-500/20 active:scale-95"
          >
            Sign In
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            className="lg:hidden w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 font-bold focus:outline-none border border-slate-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE GLASS DRAWER */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[105px] bg-white/90 backdrop-blur-2xl border-b border-slate-200/80 p-6 shadow-2xl flex flex-col gap-3 animate-in slide-in-from-top-4 duration-300 rounded-b-3xl">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
            Categories
          </div>
          <Link
            href="/shop/eyeglasses"
            onClick={() => setIsOpen(false)}
            className="p-3 font-bold text-slate-800 hover:bg-amber-50/80 hover:text-amber-600 rounded-2xl transition-all"
          >
            👓 Eyeglasses
          </Link>
          <Link
            href="/shop/sunglasses"
            onClick={() => setIsOpen(false)}
            className="p-3 font-bold text-slate-800 hover:bg-amber-50/80 hover:text-amber-600 rounded-2xl transition-all"
          >
            🕶️ Sunglasses
          </Link>
          <Link
            href="/shop/computer"
            onClick={() => setIsOpen(false)}
            className="p-3 font-bold text-slate-800 hover:bg-amber-50/80 hover:text-amber-600 rounded-2xl transition-all"
          >
            💻 Computer Glasses
          </Link>

          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2 mt-2">
            Collections
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Link
              href="/shop/men"
              onClick={() => setIsOpen(false)}
              className="py-2.5 text-center font-extrabold text-xs text-slate-800 bg-slate-100 rounded-xl"
            >
              Men
            </Link>
            <Link
              href="/shop/women"
              onClick={() => setIsOpen(false)}
              className="py-2.5 text-center font-extrabold text-xs text-slate-800 bg-slate-100 rounded-xl"
            >
              Women
            </Link>
            <Link
              href="/shop/kids"
              onClick={() => setIsOpen(false)}
              className="py-2.5 text-center font-extrabold text-xs text-slate-800 bg-slate-100 rounded-xl"
            >
              Kids
            </Link>
          </div>

          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="mt-4 bg-amber-500 text-slate-950 py-3.5 text-center rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20"
          >
            Sign In / Register
          </Link>
        </div>
      )}
    </header>
  );
}
