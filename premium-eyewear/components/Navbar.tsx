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
  ChevronRight,
  Glasses,
  Shield,
  ArrowRight
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Live Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Scroll Detection for Glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch Products for Live Spotlight Search
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
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

  // Filter Search
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      const filtered = products.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.audience?.toLowerCase().includes(q)
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, products]);

  // Focus search input when modal opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  return (
    <>
      <header
        className={`fixed w-full top-0 left-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-2xl shadow-sm border-b border-slate-200/80'
            : 'bg-white/80 backdrop-blur-xl border-b border-slate-200/50'
        }`}
      >
        {/* 🌟 1. Top Luxury Ribbon */}
        <div className="bg-slate-950 text-amber-300 text-[10px] sm:text-xs font-medium py-1.5 px-4 tracking-wider border-b border-amber-500/20">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 mx-auto sm:mx-0">
              <Sparkles className="w-3 h-3 text-amber-400 shrink-0 animate-pulse" />
              <span>
                Complimentary Computerised Eye Testing & Luxury Frame Fitting
              </span>
            </div>
            <Link
              href="/store"
              className="hidden sm:inline-flex items-center gap-1 text-slate-300 hover:text-amber-300 text-[11px] transition-colors group"
            >
              <span>Visit Patiala Store</span>
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 👓 2. Main Luxury Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* BRAND LOGO */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-amber-500/20 via-amber-400/10 to-amber-50 p-1 flex items-center justify-center border border-amber-500/30 group-hover:border-amber-500 group-hover:scale-105 transition-all shadow-sm">
              <Image
                src="/sunrise.png"
                alt="Sunrise Luxury Eyewear"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-2xl font-black tracking-tight text-slate-950 leading-none">
                SUNRISE
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest text-amber-600 font-extrabold uppercase mt-1">
                Luxury Eyewear
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION MENU (Clean, spacious, modern) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link
              href="/shop/all"
              className="relative py-1 text-xs font-bold text-slate-700 hover:text-slate-950 transition-colors uppercase tracking-wider group"
            >
              <span>All Frames</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/shop/eyeglasses"
              className="relative py-1 text-xs font-bold text-slate-700 hover:text-slate-950 transition-colors uppercase tracking-wider group"
            >
              <span>Eyeglasses</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/shop/sunglasses"
              className="relative py-1 text-xs font-bold text-slate-700 hover:text-slate-950 transition-colors uppercase tracking-wider group"
            >
              <span>Sunglasses</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/shop/computer"
              className="relative py-1 text-xs font-bold text-slate-700 hover:text-slate-950 transition-colors uppercase tracking-wider group"
            >
              <span>Blue Cut</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-500 group-hover:w-full transition-all duration-300"></span>
            </Link>

            <span className="h-4 w-[1px] bg-slate-200"></span>

            <Link
              href="/shop/men"
              className="text-xs font-extrabold text-amber-700 hover:text-amber-600 transition-colors uppercase tracking-wider"
            >
              Men
            </Link>
            <Link
              href="/shop/women"
              className="text-xs font-extrabold text-amber-700 hover:text-amber-600 transition-colors uppercase tracking-wider"
            >
              Women
            </Link>
            <Link
              href="/shop/kids"
              className="text-xs font-extrabold text-amber-700 hover:text-amber-600 transition-colors uppercase tracking-wider"
            >
              Kids
            </Link>
          </nav>

          {/* RIGHT ACTION BUTTONS */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Trigger Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-950 transition-all text-xs font-medium cursor-pointer"
              title="Search products"
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span className="hidden xl:inline text-slate-500 pr-1">Search...</span>
            </button>

            {/* Store Locator */}
            <Link
              href="/store"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-slate-200 hover:border-slate-900 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-all uppercase tracking-wider whitespace-nowrap"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span>Store</span>
            </Link>

            {/* Contact Button */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 bg-slate-950 hover:bg-amber-500 hover:text-slate-950 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm active:scale-95 whitespace-nowrap shrink-0"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span>Contact</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* 📱 MOBILE NAVIGATION DRAWER */}
        {isOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-2xl border-t border-slate-200/80 px-6 py-6 space-y-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            {/* Quick Collections */}
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">
                Featured Collections
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  href="/shop/all"
                  onClick={() => setIsOpen(false)}
                  className="p-3.5 bg-slate-50 hover:bg-amber-50 rounded-2xl text-xs font-bold text-slate-900 transition-colors flex items-center gap-2 border border-slate-100"
                >
                  <span className="text-base">👓</span>
                  <span>All Eyewear</span>
                </Link>
                <Link
                  href="/shop/eyeglasses"
                  onClick={() => setIsOpen(false)}
                  className="p-3.5 bg-slate-50 hover:bg-amber-50 rounded-2xl text-xs font-bold text-slate-900 transition-colors flex items-center gap-2 border border-slate-100"
                >
                  <span className="text-base">🔍</span>
                  <span>Eyeglasses</span>
                </Link>
                <Link
                  href="/shop/sunglasses"
                  onClick={() => setIsOpen(false)}
                  className="p-3.5 bg-slate-50 hover:bg-amber-50 rounded-2xl text-xs font-bold text-slate-900 transition-colors flex items-center gap-2 border border-slate-100"
                >
                  <span className="text-base">🕶️</span>
                  <span>Sunglasses</span>
                </Link>
                <Link
                  href="/shop/computer"
                  onClick={() => setIsOpen(false)}
                  className="p-3.5 bg-slate-50 hover:bg-amber-50 rounded-2xl text-xs font-bold text-slate-900 transition-colors flex items-center gap-2 border border-slate-100"
                >
                  <span className="text-base">💻</span>
                  <span>Screen Optics</span>
                </Link>
              </div>
            </div>

            {/* Category / Gender */}
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">
                Shop By Audience
              </span>
              <div className="grid grid-cols-3 gap-2">
                <Link
                  href="/shop/men"
                  onClick={() => setIsOpen(false)}
                  className="py-3 text-center bg-amber-50/80 hover:bg-amber-100 text-amber-900 font-extrabold text-xs uppercase tracking-wider rounded-xl"
                >
                  Men
                </Link>
                <Link
                  href="/shop/women"
                  onClick={() => setIsOpen(false)}
                  className="py-3 text-center bg-amber-50/80 hover:bg-amber-100 text-amber-900 font-extrabold text-xs uppercase tracking-wider rounded-xl"
                >
                  Women
                </Link>
                <Link
                  href="/shop/kids"
                  onClick={() => setIsOpen(false)}
                  className="py-3 text-center bg-amber-50/80 hover:bg-amber-100 text-amber-900 font-extrabold text-xs uppercase tracking-wider rounded-xl"
                >
                  Kids
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-3">
              <Link
                href="/store"
                onClick={() => setIsOpen(false)}
                className="py-3 px-4 rounded-xl border border-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-50"
              >
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>Patiala Store</span>
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="py-3 px-4 rounded-xl bg-slate-950 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-amber-500 hover:text-slate-950 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Us</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* 🔍 3. SPOTLIGHT LIVE SEARCH MODAL (Apple / Luxury E-commerce Style) */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
            {/* Search Input Bar */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3">
              <Search className="w-5 h-5 text-amber-600 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by frame name, category (e.g. Aviator, Rimless, BlueCut)..."
                className="w-full text-sm sm:text-base font-semibold text-slate-900 outline-none placeholder:text-slate-400 placeholder:font-normal"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* Quick Trending Tags */}
            {searchQuery.trim().length === 0 && (
              <div className="p-6">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-3">
                  Popular Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Rimless',
                    'Aviator',
                    'Acetate',
                    'Square',
                    'Eyeglasses',
                    'BlueCut',
                    'Sunglasses'
                  ].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results List */}
            {searchQuery.trim().length > 0 && (
              <div className="overflow-y-auto p-3 divide-y divide-slate-100">
                <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex justify-between">
                  <span>Results ({searchResults.length})</span>
                  <span className="text-amber-600">Press item to open</span>
                </div>

                {searchResults.length > 0 ? (
                  searchResults.map((item, idx) => (
                    <Link
                      key={item.id ? `search-${item.id}` : `search-${idx}`}
                      href={`/product/${item.slug}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-3.5 p-3 rounded-2xl hover:bg-amber-50/70 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-slate-100 p-1 shrink-0 border border-slate-200 flex items-center justify-center overflow-hidden">
                        <img
                          src={item.images?.[0] || '/placeholder.jpg'}
                          alt={item.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors truncate">
                          {item.name}
                        </h4>
                        <span className="text-xs text-slate-400 capitalize">
                          {item.category || 'Eyewear'} • {item.audience || 'Unisex'}
                        </span>
                      </div>
                      <span className="text-sm font-black text-slate-950 bg-slate-100 px-3 py-1 rounded-xl">
                        ₹{item.price}
                      </span>
                    </Link>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <Glasses className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm font-bold text-slate-700">
                      Koi frame nahi mila
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Kripya doosra keyword search karein (e.g. Aviator, Rimless)
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
