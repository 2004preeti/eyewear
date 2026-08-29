'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Share2,
  ChevronRight,
  Eye,
  Ruler,
  Star,
  ArrowLeft,
  ShoppingBag,
  Check,
  Copy,
  Layers,
  Heart,
  Glasses
} from 'lucide-react';

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [copied, setCopied] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'shipping'>('overview');

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch('/api/products', {
          cache: 'no-store',
        });
        if (res.ok) {
          const products: any[] = await res.json();
          const found = products.find((item: any) => item.slug === slug);
          if (found) {
            setProduct(found);
            const firstImg =
              found.images && found.images.length > 0
                ? found.images[0]
                : '/placeholder.jpg';
            setSelectedImage(firstImg);

            // Related products (same category or others, excluding current)
            const related = products
              .filter((item: any) => item.slug !== slug)
              .slice(0, 4);
            setRelatedProducts(related);
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsAppOrder = () => {
    if (!product) return;
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const message = `Hello! I would like to order this eyewear:\n\n👓 *${product.name}*\n💰 *Price:* ₹${product.price} (Qty: ${quantity})\n🏷️ *Category:* ${product.category || 'Eyewear'}\n🔗 *Link:* ${currentUrl}\n\nPlease confirm availability and payment details.`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center pt-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-slate-200 border-t-amber-500 rounded-full animate-spin"></div>
          <p className="text-slate-600 font-semibold tracking-wide animate-pulse">
            Loading Premium Eyewear...
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col items-center justify-center px-4 pt-20">
        <div className="max-w-md w-full text-center bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-100">
          <div className="w-20 h-20 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Glasses className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-3">Product Not Found</h1>
          <p className="text-slate-500 mb-8 leading-relaxed">
            The frame you are looking for might be out of stock or may have been moved.
          </p>
          <Link
            href="/shop/all"
            className="inline-flex items-center justify-center gap-2 w-full bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-amber-500 hover:text-slate-900 transition-all duration-300 shadow-md"
          >
            <ArrowLeft className="w-5 h-5" />
            Explore All Eyewear
          </Link>
        </div>
      </div>
    );
  }

  const images =
    product.images && product.images.length > 0
      ? product.images
      : ['/placeholder.jpg'];

  // Parse lines in description for specs
  const descLines: string[] = (product.description || '')
    .split('\n')
    .map((l: string) => l.trim())
    .filter(Boolean);

  const originalPrice = Math.round(Number(product.price) * 1.85);
  const discountPercent = Math.round(
    ((originalPrice - Number(product.price)) / originalPrice) * 100
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-24 pb-20">
      {/* 🧭 BREADCRUMBS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <nav className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 overflow-x-auto py-2">
          <Link href="/" className="hover:text-slate-900 transition-colors flex items-center gap-1">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <Link href="/shop/all" className="hover:text-slate-900 transition-colors">
            Shop
          </Link>
          {product.category && (
            <>
              <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <Link
                href={`/shop/${product.category.toLowerCase()}`}
                className="capitalize hover:text-slate-900 transition-colors"
              >
                {product.category}
              </Link>
            </>
          )}
          <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-xs">
            {product.name}
          </span>
        </nav>
      </div>

      {/* 🌟 MAIN PRODUCT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-100/70 border border-slate-100">
          
          {/* 📸 LEFT GALLERY: 7 COLUMNS */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Main Stage Image */}
            <div className="relative w-full aspect-square max-h-[540px] bg-gradient-to-br from-slate-50 to-slate-100/70 rounded-3xl overflow-hidden border border-slate-100 flex items-center justify-center p-6 group">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* Floating Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="bg-slate-900/90 backdrop-blur-md text-amber-400 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Premium Collection
                </span>
                {discountPercent > 0 && (
                  <span className="bg-rose-500 text-white text-xs font-extrabold px-3 py-1.5 rounded-full shadow-sm w-fit">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Wishlist & Share Quick Action */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 rounded-full backdrop-blur-md transition-all shadow-sm ${
                    isWishlisted
                      ? 'bg-rose-50 text-rose-500 border border-rose-200'
                      : 'bg-white/90 text-slate-700 hover:text-rose-500 border border-slate-200/60 hover:bg-white'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                </button>
                <button
                  onClick={handleCopyLink}
                  className="p-3 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-slate-900 border border-slate-200/60 hover:bg-white transition-all shadow-sm relative"
                  title="Share"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Share2 className="w-5 h-5" />
                  )}
                  {copied && (
                    <span className="absolute -bottom-8 right-0 bg-slate-900 text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow">
                      Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Thumbnails Row */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
                {images.map((img: string, index: number) => {
                  const isActive = selectedImage === img;
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(img)}
                      className={`relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-50 border-2 transition-all p-2 flex items-center justify-center ${
                        isActive
                          ? 'border-slate-900 ring-2 ring-slate-900/20 scale-95 shadow-sm'
                          : 'border-slate-200/80 hover:border-slate-400 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Feature Guarantees Strip */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-center">
              <div className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-slate-50/70 border border-slate-100">
                <Truck className="w-5 h-5 text-amber-600" />
                <span className="text-xs font-bold text-slate-800">Fast Shipping</span>
                <span className="text-[11px] text-slate-500">All India Dispatch</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-slate-50/70 border border-slate-100">
                <RotateCcw className="w-5 h-5 text-amber-600" />
                <span className="text-xs font-bold text-slate-800">7 Days Easy Return</span>
                <span className="text-[11px] text-slate-500">Hassle-Free Policy</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-slate-50/70 border border-slate-100">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <span className="text-xs font-bold text-slate-800">100% Genuine</span>
                <span className="text-[11px] text-slate-500">Quality Verified</span>
              </div>
            </div>
          </div>

          {/* 📝 RIGHT DETAILS: 5 COLUMNS */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Category & Audience Tag */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {product.category && (
                  <span className="bg-amber-50 text-amber-800 border border-amber-200/80 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {product.category}
                  </span>
                )}
                <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {product.audience || 'Unisex'}
                </span>
                <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                  In Stock
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug mb-3">
                {product.name}
              </h1>

              {/* Rating Review Snippet */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center gap-1 bg-amber-400/10 text-amber-700 px-2.5 py-1 rounded-lg text-xs font-black">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  4.9
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  (142 Verified Customer Ratings)
                </span>
              </div>

              {/* Price Section */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50/60 via-orange-50/40 to-slate-50 border border-amber-100/80 mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    ₹{product.price}
                  </span>
                  <span className="text-lg text-slate-400 font-semibold line-through">
                    ₹{originalPrice}
                  </span>
                  <span className="text-sm font-extrabold text-emerald-600 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                    Save ₹{originalPrice - Number(product.price)}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Inclusive of all taxes & free protective hard case + microfiber cloth
                </p>
              </div>

              {/* Description & Structured Specs */}
              <div className="space-y-4 mb-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Product Overview & Specs
                </h3>

                {descLines.length > 0 ? (
                  <div className="space-y-2">
                    {descLines.map((line, idx) => {
                      const isSpec =
                        line.toLowerCase().includes('width') ||
                        line.toLowerCase().includes('bridge') ||
                        line.toLowerCase().includes('temple') ||
                        line.toLowerCase().includes('frame') ||
                        line.toLowerCase().includes('lens') ||
                        line.toLowerCase().includes('material') ||
                        line.toLowerCase().includes('size');

                      if (isSpec) {
                        return (
                          <div
                            key={idx}
                            className="flex items-center gap-2.5 text-sm font-medium text-slate-700 bg-slate-50/80 border border-slate-100 px-3.5 py-2 rounded-xl"
                          >
                            <Ruler className="w-4 h-4 text-amber-600 flex-shrink-0" />
                            <span>{line}</span>
                          </div>
                        );
                      }

                      return (
                        <p key={idx} className="text-slate-600 text-sm leading-relaxed">
                          {line}
                        </p>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-slate-500 text-sm">
                    Premium quality lightweight eyewear frame crafted for maximum comfort, durability, and daily elegance.
                  </p>
                )}
              </div>

              {/* Frame Key Highlights */}
              <div className="grid grid-cols-2 gap-2 mb-6 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Anti-Glare & UV400</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Ultra Lightweight</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Zero Nose Pressure</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Impact Resistant</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Quantity:
                </span>
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden shadow-sm">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-200 transition-colors text-lg"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-bold text-slate-900 text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-200 transition-colors text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* 🛒 ACTION BUTTONS */}
            <div className="flex flex-col gap-3 pt-2">
              {/* WhatsApp Primary Order */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 transform hover:-translate-y-0.5 text-base sm:text-lg"
              >
                <svg
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                Order Instant on WhatsApp
              </button>

              {/* Secondary Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleWhatsAppOrder}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md text-sm sm:text-base"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Buy Now
                </button>
                <button
                  onClick={handleCopyLink}
                  className="border border-slate-300 hover:border-slate-900 bg-white text-slate-800 font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-all text-sm sm:text-base hover:bg-slate-50"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5 text-emerald-600" />
                      Link Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5 text-slate-600" />
                      Share Link
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* 🔍 DETAILED INFORMATION TABS */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-md">
          <div className="flex border-b border-slate-200 gap-4 sm:gap-8 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-4 text-sm sm:text-base font-bold transition-all border-b-2 flex-shrink-0 ${
                activeTab === 'overview'
                  ? 'border-amber-500 text-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              Why Choose This Frame
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-4 text-sm sm:text-base font-bold transition-all border-b-2 flex-shrink-0 ${
                activeTab === 'specs'
                  ? 'border-amber-500 text-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              Frame Specifications
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`pb-4 text-sm sm:text-base font-bold transition-all border-b-2 flex-shrink-0 ${
                activeTab === 'shipping'
                  ? 'border-amber-500 text-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              Shipping & Returns
            </button>
          </div>

          <div className="pt-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    Premium Build Material
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Constructed with high-grade metal alloys and premium acetate to give you a long-lasting, lightweight, and skin-friendly experience.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-amber-600" />
                    All-Day Visual Comfort
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Designed with ergonomic nose pads and soft-touch temples to minimize pressure spots and fatigue throughout long screen hours.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    1 Year Frame Warranty
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    All our frames come backed with a 12-month manufacturing warranty and complimentary alignment services.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-2xl">
                <table className="w-full text-sm text-left">
                  <tbody className="divide-y divide-slate-100">
                    <tr className="py-3">
                      <td className="py-3 font-semibold text-slate-500 w-1/3">Product Name</td>
                      <td className="py-3 font-bold text-slate-900">{product.name}</td>
                    </tr>
                    <tr className="py-3">
                      <td className="py-3 font-semibold text-slate-500">Category</td>
                      <td className="py-3 font-bold text-slate-900 capitalize">{product.category || 'Eyewear'}</td>
                    </tr>
                    <tr className="py-3">
                      <td className="py-3 font-semibold text-slate-500">Target Audience</td>
                      <td className="py-3 font-bold text-slate-900 capitalize">{product.audience || 'Unisex'}</td>
                    </tr>
                    <tr className="py-3">
                      <td className="py-3 font-semibold text-slate-500">Included Accessories</td>
                      <td className="py-3 font-bold text-slate-900">Protective Hard Case & Microfiber Cleaning Cloth</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-amber-600" />
                    Delivery Timeline
                  </h4>
                  <p>• Metro Cities: 2 - 4 Business Days</p>
                  <p>• Rest of India: 4 - 6 Business Days</p>
                  <p>• Express Dispatch within 24 hours of order confirmation</p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-amber-600" />
                    Easy Return & Exchange
                  </h4>
                  <p>• 7-day no questions asked replacement policy</p>
                  <p>• Free reverse pickup from your doorstep</p>
                  <p>• Instant support via WhatsApp chat</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 🌟 SIMILAR PRODUCTS SECTION */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
                  More To Explore
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                  Similar Eyewear Frames
                </h2>
              </div>
              <Link
                href="/shop/all"
                className="text-sm font-bold text-slate-900 hover:text-amber-600 transition-colors flex items-center gap-1"
              >
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item: any) => {
                const img =
                  item.images && item.images.length > 0
                    ? item.images[0]
                    : '/placeholder.jpg';
                return (
                  <Link
                    key={item.slug || item.name}
                    href={`/product/${item.slug}`}
                    className="group bg-white rounded-3xl p-4 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="w-full aspect-square bg-slate-50 rounded-2xl overflow-hidden p-4 mb-4 flex items-center justify-center relative">
                      <img
                        src={img}
                        alt={item.name}
                        className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                      />
                      {item.category && (
                        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[10px] font-bold text-slate-800 px-2.5 py-1 rounded-full uppercase border border-slate-200/60">
                          {item.category}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors text-base line-clamp-1 mb-1">
                        {item.name}
                      </h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-lg font-black text-slate-900">
                          ₹{item.price}
                        </span>
                        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                          In Stock
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
