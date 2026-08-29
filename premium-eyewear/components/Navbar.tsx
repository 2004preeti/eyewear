'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  X,
  Menu,
  Phone,
  MapPin,
  Sparkles,
  ShoppingBag,
  ChevronRight,
  Shield,
  Glasses
} from 'lucide-react';

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
        const res = await fetch('/api/products', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setProducts(data);
          }
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
          ? 'bg-white/95 backdrop-blur-2xl shadow-lg shadow-slate-900/5 border-b border-slate-200/80'
          : 'bg-white/90 backdrop-blur-xl border-b border-slate-100'
      }`}
    >
      {/* 🌟 Top Announcement Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-amber-950 to-slate-950 text-amber-300 text-[11px] font-bold py-1.5 px-4 text-center tracking-widest uppercase flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>Complimentary Computerised Eye Testing & Premium Lens Fitting</span>
        <span className="hidden sm:inline text-amber-400/50">•</span>
        <Link
          href="/store"
          className="hidden sm:inline-flex items-center gap-1 text-white hover:text-amber-300 underline font-semibold transition-colors"
        >
          Visit Patiala Store <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between gap-3">
        {/* 👓 BRAND LOGO */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-amber-500/20 via-amber-400/10 to-transparent p-1.5 flex items-center justify-center border border-amber-500/30 group-hover:border-amber-500 transition-all shadow-sm">
            <Image
              src="/sunrise.png"
              alt="Sunrise Optical Logo"
              width={36}
              height={36}
              className="object-contain transform group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-base sm:text-xl font-black tracking-tight text-slate-950 leading-none">
                SUNRISE
              </span>
              <span className="text-base sm:text-xl font-black tracking-tight text-amber-500 leading-none">
                OPTICAL
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] tracking-widest text-slate-400 font-bold uppercase mt-0.5">
              Luxury Eyewear Studio
            </span>
          </div>
        </Link>

        {/* 🧭 DESKTOP NAVIGATION LINKS */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 backdrop-blur-md p-1.5 rounded-full border border-slate-200/70 shadow-inner">
          <Link
            href="/shop/all"
            className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-white rounded-full transition-all uppercase tracking-wider"
          >
            All Frames
          </Link>
          <Link
            href="/shop/eyeglasses"
            className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-white rounded-full transition-all uppercase tracking-wider"
          >
            Eyeglasses
          </Link>
          <Link
            href="/shop/sunglasses"
            className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-white rounded-full transition-all uppercase tracking-wider"
          >
            Sunglasses
          </Link>
          <Link
            href="/shop/computer"
            className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-white rounded-full transition-all uppercase tracking-wider"
          >
            Computer Glasses
          </Link>

          <span className="h-4 w-[1px] bg-slate-300 mx-1"></span>

          <Link
            href="/shop/men"
            className="px-3.5 py-2 text-xs font-extrabold text-amber-600 hover:bg-amber-500 hover:text-slate-950 rounded-full transition-all uppercase tracking-wider"
          >
            Men
          </Link>
          <Link
            href="/shop/women"
            className="px-3.5 py-2 text-xs font-extrabold text-amber-600 hover:bg-amber-500 hover:text-slate-950 rounded-full transition-all uppercase tracking-wider"
          >
            Women
          </Link>
          <Link
            href="/shop/kids"
            className="px-3.5 py-2 text-xs font-extrabold text-amber-600 hover:bg-amber-500 hover:text-slate-950 rounded-full transition-all uppercase tracking-wider"
          >
            Kids
          </Link>
        </nav>

        {/* 🔍 RIGHT ACTION BAR */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop Live Search Bar */}
          <div ref={searchRef} className="relative hidden md:block w-52 lg:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery.trim() && setShowSearchDropdown(true)}
              placeholder="Search frames, style, price..."
              className="w-full bg-slate-100/90 border border-slate-200/90 focus:bg-white focus:border-amber-500 text-slate-900 text-xs font-semibold py-2.5 pl-9 pr-4 rounded-full outline-none transition-all placeholder-slate-400 shadow-sm focus:ring-2 focus:ring-amber-500/20"
            />
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400 pointer-events-none" />

            {/* Dropdown Live Results */}
            {showSearchDropdown && (
              <div className="absolute top-12 left-0 w-80 bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-50 max-h-[360px] overflow-y-auto p-2">
                <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 flex justify-between items-center">
                  <span>Found Products ({searchResults.length})</span>
                  <span className="text-amber-600">Live Search</span>
                </div>
                {searchResults.length > 0 ? (
                  <div className="divide-y divide-slate-100">
                    {searchResults.map((item) => (
                      <Link
                        key={item.id || item.slug}
                        href={`/product/${item.slug}`}
                        onClick={() => setShowSearchDropdown(false)}
                        className="flex items-center gap-3 p-2.5 hover:bg-amber-50/80 rounded-2xl transition-all group"
                      >
                        <div className="w-10 h-10 bg-slate-50 rounded-xl p-1 shrink-0 border border-slate-100 flex items-center justify-center overflow-hidden">
                          <img
                            src={item.images?.[0] || '/placeholder.jpg'}
                            alt={item.name}
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                          />
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="text-xs font-bold text-slate-900 truncate group-hover:text-amber-600 transition-colors">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-slate-400 capitalize">
                            {item.category || 'Eyewear'} • {item.audience || 'Unisex'}
                          </span>
                        </div>
                        <span className="text-xs font-black text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                          ₹{item.price}
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-xs text-slate-400 font-semibold">
                    No matching frames found.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Search Toggle */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden p-2.5 rounded-2xl bg-slate-100 text-slate-700 hover:text-slate-950 transition-colors"
            aria-label="Toggle Search"
          >
            {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>

          {/* Store & Contact Direct Links */}
          <Link
            href="/store"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 hover:border-slate-900 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-all uppercase tracking-wider"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-600" />
            <span>Store</span>
          </Link>

          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-1.5 bg-slate-950 hover:bg-amber-500 hover:text-slate-950 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md active:scale-95 shrink-0"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Contact</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2.5 rounded-2xl bg-slate-100 text-slate-950 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 📱 MOBILE SEARCH EXPANDED BAR */}
      {isSearchOpen && (
        <div
          className="md:hidden px-4 pb-4 pt-1 bg-white border-t border-slate-100 shadow-xl"
          ref={searchRef}
        >
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery.trim() && setShowSearchDropdown(true)}
              placeholder="Search frames..."
              className="w-full bg-slate-100 border border-slate-200 text-slate-900 text-sm font-semibold py-3 pl-10 pr-4 rounded-2xl outline-none"
              autoFocus
            />
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" />
          </div>

          {showSearchDropdown && (
            <div className="mt-2 w-full bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden max-h-[280px] overflow-y-auto">
              {searchResults.length > 0 ? (
                <div className="p-2 divide-y divide-slate-100">
                  {searchResults.map((item) => (
                    <Link
                      key={item.id || item.slug}
                      href={`/product/${item.slug}`}
                      onClick={() => {
                        setShowSearchDropdown(false);
                        setIsSearchOpen(false);
                      }}
                      className="flex items-center gap-3 p-2.5 hover:bg-amber-50 rounded-xl"
                    >
                      <img
                        src={item.images?.[0] || '/placeholder.jpg'}
                        alt={item.name}
                        className="w-9 h-9 object-contain rounded-lg bg-gray-50 shrink-0"
                      />
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-xs font-bold text-slate-800 truncate">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-slate-400 capitalize">
                          {item.category}
                        </span>
                      </div>
                      <span className="text-xs font-black text-amber-600">
                        ₹{item.price}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-slate-400">
                  No frames found.
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 📱 MOBILE NAV MENU DRAWER */}
      {isOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-2xl border-t border-slate-100 px-6 py-6 space-y-6 shadow-2xl">
          <div className="space-y-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Explore Collections
            </span>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/shop/all"
                onClick={() => setIsOpen(false)}
                className="p-3 bg-slate-50 hover:bg-amber-50 rounded-2xl text-xs font-bold text-slate-800 transition-colors"
              >
                👓 All Frames
              </Link>
              <Link
                href="/shop/eyeglasses"
                onClick={() => setIsOpen(false)}
                className="p-3 bg-slate-50 hover:bg-amber-50 rounded-2xl text-xs font-bold text-slate-800 transition-colors"
              >
                🔍 Eyeglasses
              </Link>
              <Link
                href="/shop/sunglasses"
                onClick={() => setIsOpen(false)}
                className="p-3 bg-slate-50 hover:bg-amber-50 rounded-2xl text-xs font-bold text-slate-800 transition-colors"
              >
                🕶️ Sunglasses
              </Link>
              <Link
                href="/shop/computer"
                onClick={() => setIsOpen(false)}
                className="p-3 bg-slate-50 hover:bg-amber-50 rounded-2xl text-xs font-bold text-slate-800 transition-colors"
              >
                💻 Blue Cut Lenses
              </Link>
            </div>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              By Audience
            </span>
            <div className="flex gap-2">
              <Link
                href="/shop/men"
                onClick={() => setIsOpen(false)}
                className="flex-1 text-center py-2.5 bg-amber-50 text-amber-800 rounded-xl text-xs font-extrabold uppercase tracking-wider"
              >
                Men
              </Link>
              <Link
                href="/shop/women"
                onClick={() => setIsOpen(false)}
                className="flex-1 text-center py-2.5 bg-amber-50 text-amber-800 rounded-xl text-xs font-extrabold uppercase tracking-wider"
              >
                Women
              </Link>
              <Link
                href="/shop/kids"
                onClick={() => setIsOpen(false)}
                className="flex-1 text-center py-2.5 bg-amber-50 text-amber-800 rounded-xl text-xs font-extrabold uppercase tracking-wider"
              >
                Kids
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
            <Link
              href="/store"
              onClick={() => setIsOpen(false)}
              className="py-3 px-4 rounded-2xl border border-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-50"
            >
              <MapPin className="w-4 h-4 text-amber-600" />
              Store Locator
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="py-3 px-4 rounded-2xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-amber-500 hover:text-slate-950 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
