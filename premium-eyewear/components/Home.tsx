'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const banners = [
  {
    id: 1,
    tag: 'NEW COLLECTION 2026',
    title: 'Precision',
    highlight: 'Optics.',
    desc: 'Crafted with Japanese Titanium and Ultra-Clear Anti-Glare Lenses.',
    image:
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 2,
    tag: 'POLARIZED PROTECTION',
    title: 'Block Glare.',
    highlight: 'See Pure.',
    desc: '100% UV400 Protected Lenses engineered for peak outdoor performance.',
    image:
      'https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 3,
    tag: 'BLUE LIGHT CUT',
    title: 'Digital',
    highlight: 'Comfort.',
    desc: 'Reduce screen fatigue with blue light filtering acetate frames.',
    image:
      'https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=2000&auto=format&fit=crop',
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLiveProducts() {
      try {
        const res = await fetch(
          'https://eyewear-3zv6.onrender.com/api/products',
          {
            cache: 'no-store',
          },
        );
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (error) {
        console.error('Failed to fetch home products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchLiveProducts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex flex-col bg-slate-50 text-slate-900 pt-24">
      {/* 🌟 HERO BANNER (NO OVERLAPPING CARDS) */}
      <section className="relative w-full h-[85vh] overflow-hidden bg-slate-950">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index
                ? 'opacity-100 z-10'
                : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image */}
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover object-center"
              priority
            />

            {/* Subtle Gradient Shadow (Left to Right) for text readability without heavy boxes */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

            {/* Left-Aligned Floating Text & Actions */}
            <div className="container mx-auto px-8 md:px-16 h-full relative z-20 flex flex-col justify-center items-start text-left">
              <div className="max-w-xl space-y-5">
                {/* Minimal Pill Badge */}
                <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/30 text-amber-300 font-extrabold text-xs tracking-widest">
                  {banner.tag}
                </span>

                {/* Clean Large Heading */}
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none">
                  {banner.title}{' '}
                  <span className="text-amber-400">{banner.highlight}</span>
                </h1>

                {/* Description */}
                <p className="text-slate-200 text-sm md:text-base font-medium leading-relaxed max-w-md">
                  {banner.desc}
                </p>

                {/* Glass Category Pill Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-4">
                  {['Men', 'Women', 'Kids'].map((cat) => (
                    <Link
                      key={cat}
                      href={`/shop/${cat.toLowerCase()}`}
                      className="px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-white/10 hover:bg-amber-500 hover:text-slate-950 backdrop-blur-md border border-white/20 transition-all duration-300 shadow-lg active:scale-95"
                    >
                      Shop {cat}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Sleek Carousel Indicators */}
        <div className="absolute bottom-8 left-8 md:left-16 z-30 flex gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentSlide === i ? 'w-8 bg-amber-400' : 'w-2 bg-white/40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 💎 FEATURED PRODUCTS SECTION */}
      <section className="py-20 container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col items-center mb-12 text-center">
          <span className="text-amber-600 font-extrabold text-xs uppercase tracking-widest mb-1">
            Curated Eyewear
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Featured Optical Collection
          </h2>
          <div className="w-12 h-1 bg-amber-500 rounded-full mt-3" />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-80 rounded-3xl bg-slate-200/60 animate-pulse border border-slate-200"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8">
            <p className="text-slate-500 font-semibold">
              No products available in database.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.slice(0, 6).map((product) => {
              const imageUrl =
                product.images && product.images.length > 0
                  ? product.images[0]
                  : '/placeholder.jpg';

              return (
                <div
                  key={product.id || product._id}
                  className="group relative bg-white border border-slate-200/80 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {product.audience && (
                    <span className="absolute top-4 left-4 z-10 bg-slate-900/90 text-amber-300 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {product.audience}
                    </span>
                  )}

                  <div className="h-64 bg-slate-50 relative overflow-hidden flex items-center justify-center p-4">
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6 flex flex-col gap-2 flex-1 justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                          {product.name}
                        </h3>
                        <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-100 px-2 py-0.5 rounded">
                          {product.category}
                        </span>
                      </div>
                      <p className="text-slate-500 text-xs line-clamp-2">
                        {product.description || 'Premium optical frame.'}
                      </p>
                    </div>

                    <div className="pt-3 flex justify-between items-center border-t border-slate-100 mt-2">
                      <span className="text-xl font-black text-slate-900">
                        ₹{product.price}
                      </span>
                      <Link
                        href={`/product/${product.slug}`}
                        className="bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all"
                      >
                        View Frame
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
