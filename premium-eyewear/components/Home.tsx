'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const banners = [
  {
    id: 1,
    tag: 'New Arrivals',
    title: 'The 2026',
    highlight: 'Aviator Series',
    desc: 'Experience timeless style...',
    image:
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2000&auto=format&fit=crop',
    textColor: 'text-white',
  },
  {
    id: 2,
    tag: 'Summer Essentials',
    title: 'Polarized',
    highlight: 'Perfection.',
    desc: 'Block the glare...',
    image:
      'https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=2000&auto=format&fit=crop',
    textColor: 'text-gray-900',
  },
  {
    id: 3,
    tag: 'Blue Light Protection',
    title: 'Work Hard.',
    highlight: 'See Better.',
    desc: 'Protect your eyes...',
    image:
      'https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=2000&auto=format&fit=crop',
    textColor: 'text-white',
  },
];

const featuredProducts = [
  {
    id: 1,
    name: 'Aviator Classic',
    price: 2999,
    desc: 'Premium Titanium Frame',
    image:
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop',
    slug: 'aviator-classic',
  },
  {
    id: 2,
    name: 'Wayfarer Pro',
    price: 3499,
    desc: 'Matte Black Acetate',
    image:
      'https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=800&auto=format&fit=crop',
    slug: 'wayfarer-pro',
  },
  {
    id: 3,
    name: 'Round Vintage',
    price: 2499,
    desc: 'Anti-Glare Blue Cut',
    image:
      'https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=800&auto=format&fit=crop',
    slug: 'round-vintage',
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex flex-col pt-20">
      {/* Hero Banner */}
      <section className="relative w-full h-[85vh] overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover"
              priority
            />
            <div className={`absolute inset-0 bg-black/40`}></div>

            <div className="container mx-auto px-6 h-full relative z-20 flex flex-col justify-center items-center text-center text-white">
              <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter">
                {banner.title}{' '}
                <span className="text-yellow-400">{banner.highlight}</span>
              </h1>

              {/* UNIQUE BUTTON ROW */}
              <div className="flex gap-4 mt-8 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20">
                {['Men', 'Women', 'Kids'].map((cat) => (
                  <Link
                    key={cat}
                    href={`/shop/${cat.toLowerCase()}`}
                    className="px-8 py-3 rounded-full font-bold hover:bg-white hover:text-black transition-all duration-300"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Featured Products */}
      <section className="py-20 container mx-auto px-4">
        <h2 className="text-4xl font-extrabold mb-12 text-center tracking-tight">
          Featured Optical
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group border border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="h-72 bg-gray-100 relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-1">{product.name}</h3>
                <p className="text-gray-500 mb-6">{product.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-yellow-600">
                    ₹{product.price}
                  </span>
                  <Link
                    href={`/product/${product.slug}`}
                    className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-yellow-500 transition-colors"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
