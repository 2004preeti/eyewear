'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Scroll Effect
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

  // Fetch Products for Live Search
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          'https://eyewear-3zv6.onrender.com/api/products',
          { cache: 'no-store' },
        );
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error('Failed to load search data:', err);
      }
    }
    fetchProducts();
  }, []);

  // Search Filter
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 0) {
      const filtered = products.filter((item) => {
        const nameMatch = item.name
          ?.toLowerCase()
          .includes(query.toLowerCase());
        const catMatch = item.category
          ?.toLowerCase()
          .includes(query.toLowerCase());
        const audMatch = item.audience
          ?.toLowerCase()
          .includes(query.toLowerCase());
        return nameMatch || catMatch || audMatch;
      });
      setSearchResults(filtered);
      setShowSearchDropdown(true);
    } else {
      setSearchResults([]);
      setShowSearchDropdown(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-2xl shadow-md border-b border-slate-200'
          : 'bg-white/90 backdrop-blur-xl border-b border-gray-100'
      }`}
    >
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-900 to-slate-900 text-amber-200 text-[10px] sm:text-[11px] font-bold py-1.5 px-3 text-center tracking-wider uppercase truncate max-w-full">
        ✨ COMPLIMENTARY ANTI-GLARE COATING ON ALL PREMIUM ORDERS
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-500/10 p-1 flex items-center justify-center border border-amber-500/20">
            <Image
              src="/sunrise.png"
              alt="Sunrise Optical Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-lg font-black tracking-tight text-slate-900 leading-none">
              SUNRISE <span className="text-amber-500">OPTICAL</span>
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-widest text-slate-400 font-semibold uppercase">
              LUXURY EYEWEAR
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION LINKS */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/60">
          <Link
            href="/shop/eyeglasses"
            className="px-4 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-white rounded-full transition-all uppercase tracking-wider"
          >
            Eyeglasses
          </Link>
          <Link
            href="/shop/sunglasses"
            className="px-4 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-white rounded-full transition-all uppercase tracking-wider"
          >
            Sunglasses
          </Link>
          <Link
            href="/shop/computer"
            className="px-4 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-white rounded-full transition-all uppercase tracking-wider"
          >
            Computer
          </Link>
          <span className="h-3.5 w-[1px] bg-slate-300 mx-1"></span>
          <Link
            href="/shop/men"
            className="px-3.5 py-1.5 text-xs font-extrabold text-amber-600 hover:bg-amber-50 rounded-full transition-all uppercase tracking-wider"
          >
            Men
          </Link>
          <Link
            href="/shop/women"
            className="px-3.5 py-1.5 text-xs font-extrabold text-amber-600 hover:bg-amber-50 rounded-full transition-all uppercase tracking-wider"
          >
            Women
          </Link>
          <Link
            href="/shop/kids"
            className="px-3.5 py-1.5 text-xs font-extrabold text-amber-600 hover:bg-amber-50 rounded-full transition-all uppercase tracking-wider"
          >
            Kids
          </Link>
        </nav>

        {/* RIGHT ACTION: SEARCH & ACTIONS */}
        <div className="flex items-center gap-1 sm:gap-3">
          {/* Desktop Search Bar */}
          <div
            ref={searchRef}
            className="relative hidden md:block w-48 lg:w-64"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery.trim() && setShowSearchDropdown(true)}
              placeholder="Search glasses..."
              className="w-full bg-slate-100/90 border border-slate-200 focus:bg-white focus:border-amber-500 text-slate-900 text-xs font-semibold py-2 pl-8 pr-3 rounded-full outline-none transition-all placeholder-slate-400"
            />
            <svg
              className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400 pointer-events-none"
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

            {/* Dropdown Results */}
            {showSearchDropdown && (
              <div className="absolute top-10 left-0 w-72 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-[300px] overflow-y-auto">
                {searchResults.length > 0 ? (
                  <div className="p-2 divide-y divide-slate-100">
                    {searchResults.map((item) => (
                      <Link
                        key={item.id || item._id}
                        href={`/product/${item.slug}`}
                        onClick={() => setShowSearchDropdown(false)}
                        className="flex items-center gap-3 p-2 hover:bg-amber-50 rounded-xl transition-all"
                      >
                        <img
                          src={item.images?.[0] || '/placeholder.jpg'}
                          alt={item.name}
                          className="w-8 h-8 object-cover rounded-lg bg-gray-50 shrink-0"
                        />
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-bold text-slate-800 truncate">
                            {item.name}
                          </span>
                          <span className="text-[9px] text-slate-400 uppercase">
                            {item.category}
                          </span>
                        </div>
                        <span className="ml-auto text-xs font-extrabold text-amber-600">
                          ₹{item.price}
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-slate-400 font-semibold">
                    No glasses found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Search Icon Toggle */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-900"
            aria-label="Toggle Search"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* Sign In Button */}
          <Link
            href="/login"
            className="hidden sm:inline-block bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-sm shrink-0"
          >
            Sign In
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            className="lg:hidden p-2 text-slate-900 font-bold text-xl leading-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* MOBILE SEARCH BAR TOGGLE PANEL */}
      {isSearchOpen && (
        <div
          className="md:hidden px-4 pb-3 pt-1 border-t border-slate-100 bg-white"
          ref={searchRef}
        >
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery.trim() && setShowSearchDropdown(true)}
              placeholder="Search glasses..."
              className="w-full bg-slate-100 border border-slate-200 text-slate-900 text-xs font-semibold py-2 pl-8 pr-3 rounded-full outline-none"
            />
            <svg
              className="w-3.5 h-3.5 absolute left-2.5 top-3 text-slate-400 pointer-events-none"
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
          </div>

          {showSearchDropdown && (
            <div className="mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden max-h-[250px] overflow-y-auto">
              {searchResults.length > 0 ? (
                <div className="p-2 divide-y divide-slate-100">
                  {searchResults.map((item) => (
                    <Link
                      key={item.id || item._id}
                      href={`/product/${item.slug}`}
                      onClick={() => {
                        setShowSearchDropdown(false);
                        setIsSearchOpen(false);
                      }}
                      className="flex items-center gap-3 p-2 hover:bg-amber-50 rounded-xl"
                    >
                      <img
                        src={item.images?.[0] || '/placeholder.jpg'}
                        alt={item.name}
                        className="w-8 h-8 object-cover rounded-lg bg-gray-50 shrink-0"
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-slate-800 truncate">
                          {item.name}
                        </span>
                        <span className="text-[9px] text-slate-400 uppercase">
                          {item.category}
                        </span>
                      </div>
                      <span className="ml-auto text-xs font-extrabold text-amber-600">
                        ₹{item.price}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-3 text-center text-xs text-slate-400">
                  No glasses found
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* MOBILE NAV MENU */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-5 py-4 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Categories
            </span>
            <Link
              href="/shop/eyeglasses"
              onClick={() => setIsOpen(false)}
              className="text-sm font-bold text-slate-700"
            >
              Eyeglasses
            </Link>
            <Link
              href="/shop/sunglasses"
              onClick={() => setIsOpen(false)}
              className="text-sm font-bold text-slate-700"
            >
              Sunglasses
            </Link>
            <Link
              href="/shop/computer"
              onClick={() => setIsOpen(false)}
              className="text-sm font-bold text-slate-700"
            >
              Computer
            </Link>
          </div>

          <div className="flex flex-col space-y-2 border-t border-slate-100 pt-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Collection
            </span>
            <Link
              href="/shop/men"
              onClick={() => setIsOpen(false)}
              className="text-sm font-extrabold text-amber-600"
            >
              Men
            </Link>
            <Link
              href="/shop/women"
              onClick={() => setIsOpen(false)}
              className="text-sm font-extrabold text-amber-600"
            >
              Women
            </Link>
            <Link
              href="/shop/kids"
              onClick={() => setIsOpen(false)}
              className="text-sm font-extrabold text-amber-600"
            >
              Kids
            </Link>
          </div>

          <div className="pt-2 sm:hidden border-t border-slate-100">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-slate-900 text-white py-2 rounded-full font-bold text-xs uppercase"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
