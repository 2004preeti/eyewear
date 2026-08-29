'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Eye,
  Star,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Glasses,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';

const banners = [
  {
    id: 'banner-1',
    tag: 'LUXURY TITANIUM 2026',
    title: 'Architectural',
    highlight: 'Frames.',
    badge: 'Ultralight 12g',
    desc: 'Handcrafted Japanese Titanium frames paired with Ultra-Clear Anti-Reflective lenses for all-day comfort.',
    image:
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2000&auto=format&fit=crop',
    link: '/shop/eyeglasses',
    btnText: 'Shop Eyeglasses',
  },
  {
    id: 'banner-2',
    tag: 'POLARIZED HIGH-DEFINITION',
    title: 'Zero Glare.',
    highlight: 'Pure Optics.',
    badge: '100% UV400 Polarized',
    desc: 'Precision optical shades engineered to eliminate harsh reflections and maximize visual depth outdoors.',
    image:
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=2000&auto=format&fit=crop',
    link: '/shop/sunglasses',
    btnText: 'Explore Sunglasses',
  },
  {
    id: 'banner-3',
    tag: 'DIGITAL SCREEN PROTECTION',
    title: 'Smart Blue',
    highlight: 'Shield.',
    badge: 'Anti-Fatigue Filter',
    desc: 'Block 99% harmful screen blue light without yellow tint distortion. Perfect for long working hours.',
    image:
      'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=2000&auto=format&fit=crop',
    link: '/shop/computer',
    btnText: 'Shop Blue Cut',
  },
  {
    id: 'banner-4',
    tag: 'PATIALA FLAGSHIP SHOWROOM',
    title: 'Bespoke',
    highlight: 'Eye Styling.',
    badge: 'Free Computerised Exam',
    desc: 'Experience luxury optical styling, computerized power checkups, and instant frame fitting at our Patiala studio.',
    image:
      'https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=2000&auto=format&fit=crop',
    link: '/store',
    btnText: 'Visit Patiala Store',
  },
];

const categoryCards = [
  {
    title: 'Eyeglasses',
    desc: 'Daily vision clarity & featherweight comfort',
    link: '/shop/eyeglasses',
    image:
      'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=800&auto=format&fit=crop',
    badge: 'Trending',
  },
  {
    title: 'Sunglasses',
    desc: '100% UV400 polarized shades & tints',
    link: '/shop/sunglasses',
    image:
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=800&auto=format&fit=crop',
    badge: 'Popular',
  },
  {
    title: 'Computer Glasses',
    desc: 'Screen protection with blue light cut optics',
    link: '/shop/computer',
    image:
      'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=800&auto=format&fit=crop',
    badge: 'Essential',
  },
  {
    title: 'Men & Women Collection',
    desc: 'Tailored silhouettes for all face shapes',
    link: '/shop/men',
    image:
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=800&auto=format&fit=crop',
    badge: 'Curated',
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Live Products from API
  useEffect(() => {
    async function fetchLiveProducts() {
      try {
        const res = await fetch('/api/products', {
          cache: 'no-store',
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setProducts(data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch home products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchLiveProducts();
  }, []);

  // Auto Banner Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  return (
    <div className="w-full flex flex-col bg-slate-50 text-slate-900 overflow-hidden">
      {/* 🌟 1. HERO BANNER CAROUSEL */}
      <section className="relative w-full h-[80vh] sm:h-[84vh] md:h-[90vh] overflow-hidden bg-slate-950 group/carousel">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index
                ? 'opacity-100 z-10'
                : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background High-res Image */}
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover object-center transform scale-105 transition-transform duration-10000 ease-out"
              priority={index === 0}
            />

            {/* Gradient Overlay for Crisp Text Contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/20" />

            {/* Content Box */}
            <div className="container mx-auto px-6 sm:px-12 md:px-16 h-full relative z-20 flex flex-col justify-center items-start text-left">
              <div className="max-w-xl space-y-4 sm:space-y-6">
                {/* Pill Tag & Highlight Badge */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/40 text-amber-300 font-extrabold text-[11px] sm:text-xs tracking-widest uppercase shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    {banner.tag}
                  </span>
                  {banner.badge && (
                    <span className="hidden sm:inline-block px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-[10px] uppercase tracking-wider">
                      {banner.badge}
                    </span>
                  )}
                </div>

                {/* Hero Title */}
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.08]">
                  {banner.title}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">
                    {banner.highlight}
                  </span>
                </h1>

                {/* Description */}
                <p className="text-slate-200 text-xs sm:text-sm md:text-base font-medium leading-relaxed max-w-lg">
                  {banner.desc}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href={banner.link}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all duration-300 shadow-xl shadow-amber-500/30 active:scale-95 transform hover:-translate-y-0.5"
                  >
                    <span>{banner.btnText || 'Explore Collection'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <div className="flex items-center gap-2">
                    {['Men', 'Women'].map((cat) => (
                      <Link
                        key={`cat-pill-${cat}`}
                        href={`/shop/${cat.toLowerCase()}`}
                        className="px-5 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all active:scale-95"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* ⬅️ ➡️ Navigation Arrows */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/40 hover:bg-amber-500 text-white hover:text-slate-950 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 opacity-75 group-hover/carousel:opacity-100 active:scale-90"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/40 hover:bg-amber-500 text-white hover:text-slate-950 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 opacity-75 group-hover/carousel:opacity-100 active:scale-90"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Carousel Indicators & Slide Preview Chips */}
        <div className="absolute bottom-8 left-6 sm:left-12 md:left-16 z-30 flex items-center gap-3">
          {banners.map((item, i) => (
            <button
              key={`dot-${i}`}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                currentSlide === i
                  ? 'w-12 bg-amber-400 shadow-lg shadow-amber-400/50'
                  : 'w-3 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 🛡️ 2. VALUE PROPOSITIONS BAR */}
      <section className="bg-white border-y border-slate-200/80 py-8 relative z-20 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="flex items-center gap-4 p-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 border border-amber-500/20">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">Computerised Testing</h4>
                <p className="text-slate-500 text-xs mt-0.5">Precise optical screening</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 border border-amber-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">1-Year Frame Warranty</h4>
                <p className="text-slate-500 text-xs mt-0.5">100% genuine guaranteed</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 border border-amber-500/20">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">7-Day Easy Exchange</h4>
                <p className="text-slate-500 text-xs mt-0.5">Hassle-free return policy</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 border border-amber-500/20">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">Express Dispatch</h4>
                <p className="text-slate-500 text-xs mt-0.5">Fast delivery all over India</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 👓 3. CATEGORY DISCOVERY SECTION */}
      <section className="py-16 sm:py-24 container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-4">
          <div>
            <span className="text-amber-600 font-extrabold text-xs uppercase tracking-widest">
              Curated Optical Lines
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
              Shop By Eyewear Category
            </h2>
          </div>
          <Link
            href="/shop/all"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-amber-600 transition-colors"
          >
            <span>Browse Complete Catalog</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryCards.map((cat, idx) => (
            <Link
              key={`cat-card-${idx}`}
              href={cat.link}
              className="group relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-end p-6 border border-slate-200/60 bg-slate-900"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

              <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                {cat.badge}
              </span>

              <div className="relative z-10 space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-amber-300 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-slate-300 text-xs line-clamp-2">
                  {cat.desc}
                </p>
                <div className="pt-2 inline-flex items-center gap-1 text-xs font-extrabold text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>Shop Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 💎 4. FEATURED PRODUCTS COLLECTION */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50 to-white border-y border-slate-200/70">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2">
            <span className="text-amber-600 font-extrabold text-xs uppercase tracking-widest">
              Exclusive Arrivals
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Featured Optical Collection
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              Handpicked frames engineered for unmatched aesthetics, durability, and optical comfort.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={`skeleton-${n}`}
                  className="h-96 rounded-3xl bg-slate-200/70 animate-pulse border border-slate-200"
                />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 max-w-md mx-auto shadow-sm">
              <Glasses className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-600 font-bold">No products available at the moment.</p>
              <p className="text-slate-400 text-xs mt-1">Please check back soon or visit our store.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.slice(0, 6).map((product, idx) => {
                const imageUrl =
                  product.images && product.images.length > 0
                    ? product.images[0]
                    : '/placeholder.jpg';

                const productKey = product.id || product.slug || `prod-${idx}`;
                const originalPrice = Math.round(Number(product.price) * 1.85);

                return (
                  <div
                    key={productKey}
                    className="group relative bg-white border border-slate-200/80 rounded-3xl overflow-hidden hover:shadow-2xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Floating Audience / Category Tags */}
                    <div className="absolute top-4 left-4 z-10 flex gap-2">
                      {product.audience && (
                        <span className="bg-slate-950/90 backdrop-blur-md text-amber-300 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                          {product.audience}
                        </span>
                      )}
                      {product.category && (
                        <span className="bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-slate-200/70">
                          {product.category}
                        </span>
                      )}
                    </div>

                    {/* Image Stage */}
                    <div className="h-64 sm:h-72 bg-gradient-to-br from-slate-50 to-slate-100/70 relative overflow-hidden flex items-center justify-center p-6">
                      <img
                        src={imageUrl}
                        alt={product.name || 'Optical Frame'}
                        className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-110 transition-transform duration-500 ease-out"
                      />
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex flex-col gap-3 flex-1 justify-between bg-white">
                      <div>
                        <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-slate-500 text-xs line-clamp-2 mt-1 leading-relaxed">
                          {product.description || 'Premium optical frame.'}
                        </p>
                      </div>

                      {/* Pricing & CTA */}
                      <div className="pt-4 flex justify-between items-center border-t border-slate-100 mt-2">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl sm:text-2xl font-black text-slate-950">
                              ₹{product.price}
                            </span>
                            <span className="text-xs font-semibold text-slate-400 line-through">
                              ₹{originalPrice}
                            </span>
                          </div>
                          <span className="text-[10px] font-extrabold text-emerald-600">
                            In Stock
                          </span>
                        </div>

                        <Link
                          href={`/product/${product.slug}`}
                          className="bg-slate-950 hover:bg-amber-500 hover:text-slate-950 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md active:scale-95 flex items-center gap-1"
                        >
                          <span>View Frame</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* View All Button */}
          <div className="text-center mt-12 sm:mt-16">
            <Link
              href="/shop/all"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-extrabold text-xs uppercase tracking-widest text-white bg-slate-950 hover:bg-amber-500 hover:text-slate-950 transition-all duration-300 shadow-xl shadow-slate-900/10 active:scale-95"
            >
              <span>Explore All {products.length} Eyewear Frames</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 🏥 5. STORE VISIT & APPOINTMENT BANNER */}
      <section className="py-16 sm:py-20 container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 p-8 sm:p-14 text-white shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4 sm:space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-extrabold uppercase tracking-widest border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              Patiala Flagship Studio
            </span>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Get Your Eyes Tested By Certified Optometrists
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Experience complimentary computerised eye power checkups, customized frame fitting, and personal lens consulting at our luxury showroom in Patiala.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/store"
                className="px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-amber-400 text-slate-950 hover:bg-amber-300 transition-all shadow-lg active:scale-95"
              >
                Store Location & Directions
              </Link>
              <a
                href="https://wa.me/919815532497?text=Hello!%20I%20would%20like%20to%20book%20an%20eye%20examination%20appointment."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all active:scale-95"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                Book via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ⭐ 6. TESTIMONIALS & SOCIAL PROOF */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200/80">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16 space-y-2">
            <span className="text-amber-600 font-extrabold text-xs uppercase tracking-widest">
              Verified Customers
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Trusted by 10,000+ Happy Eyes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed font-medium">
                "The frame quality is unbelievable for this price. Extremely lightweight and comfortable for 10+ hours daily coding work."
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-200/60">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-700 font-bold flex items-center justify-center text-sm">
                  RP
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-xs">Rohit Patel</h5>
                  <span className="text-[11px] text-slate-400">Verified Buyer</span>
                </div>
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed font-medium">
                "Visited their Patiala store for an eye exam. The staff was courteous and the customized frame fitting was done within 20 minutes!"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-200/60">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-700 font-bold flex items-center justify-center text-sm">
                  SK
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-xs">Simran Kaur</h5>
                  <span className="text-[11px] text-slate-400">Store Walk-in Customer</span>
                </div>
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed font-medium">
                "Ordered sunglasses online via WhatsApp. Received perfectly in a premium hard case with anti-scratch cloth. 10/10 experience."
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-200/60">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-700 font-bold flex items-center justify-center text-sm">
                  AS
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-xs">Aman Sharma</h5>
                  <span className="text-[11px] text-slate-400">Verified Online Order</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
