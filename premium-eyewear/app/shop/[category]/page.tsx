import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import {
  Sparkles,
  ChevronRight,
  Filter,
  Glasses,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  // 1. Fetch live products from Supabase directly
  let allProducts: any[] = [];
  try {
    const { data, error } = await supabase.from('products').select('*');
    if (!error && data) {
      allProducts = data;
    }
  } catch (error) {
    console.error('Failed to fetch category products:', error);
  }

  const targetQuery = category.toLowerCase().trim();

  // 2. 🔍 FLEXIBLE MATCHING FOR BOTH "CATEGORY", "AUDIENCE", OR "ALL"
  const products = allProducts.filter((product: any) => {
    if (targetQuery === 'all' || targetQuery === 'shop') return true;

    // Check if category matches
    const categoryMatch =
      product.category &&
      product.category.toLowerCase().trim().includes(targetQuery);

    // Check if target audience (Men/Women/Kids) matches
    const audienceMatch =
      product.audience && product.audience.toLowerCase().trim() === targetQuery;

    return categoryMatch || audienceMatch;
  });

  const categoriesList = [
    { label: 'All Frames', slug: 'all' },
    { label: 'Eyeglasses', slug: 'eyeglasses' },
    { label: 'Sunglasses', slug: 'sunglasses' },
    { label: 'Computer Glasses', slug: 'computer' },
    { label: 'Men', slug: 'men' },
    { label: 'Women', slug: 'women' },
    { label: 'Kids', slug: 'kids' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-24 pb-20">
      {/* 🧭 BREADCRUMB & HEADER */}
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl mb-8">
        <nav className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 mb-6">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <Link href="/shop/all" className="hover:text-slate-900 transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <span className="text-slate-900 font-semibold capitalize">
            {category}
          </span>
        </nav>

        {/* Category Hero Title Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs uppercase tracking-widest border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              Eyewear Collection
            </span>
            <h1 className="text-3xl sm:text-5xl font-black capitalize tracking-tight">
              {category === 'all' ? 'All Eyewear' : `${category} Collection`}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm font-medium max-w-xl">
              Showing {products.length} hand-crafted frames with anti-glare coatings and lightweight comfort.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 text-center shrink-0">
            <span className="text-2xl sm:text-3xl font-black text-amber-400">
              {products.length}
            </span>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-300">
              Frames Available
            </span>
          </div>
        </div>
      </div>

      {/* 🏷️ CATEGORY FILTER PILLS */}
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl mb-10">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categoriesList.map((catItem) => {
            const isActive =
              catItem.slug.toLowerCase() === category.toLowerCase();
            return (
              <Link
                key={catItem.slug}
                href={`/shop/${catItem.slug}`}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 shadow-sm ${isActive
                    ? 'bg-slate-950 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-amber-50 hover:text-slate-950 border border-slate-200/80'
                  }`}
              >
                {catItem.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* 🛍️ PRODUCTS GRID */}
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/80 shadow-md p-8 max-w-md mx-auto space-y-4">
            <Glasses className="w-14 h-14 text-slate-400 mx-auto" />
            <h2 className="text-2xl font-black text-slate-900">
              No Products Found
            </h2>
            <p className="text-slate-500 text-sm">
              We couldn't find any frames under{' '}
              <span className="font-bold text-slate-900 capitalize">
                "{category}"
              </span>
              .
            </p>
            <div className="pt-2">
              <Link
                href="/shop/all"
                className="inline-flex items-center gap-2 bg-slate-950 text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-amber-500 hover:text-slate-950 transition-all shadow-md"
              >
                <ArrowLeft className="w-4 h-4" />
                View All Eyewear
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
            {products.map((product: any, idx: number) => {
              const imageUrl =
                product.images && product.images.length > 0
                  ? product.images[0]
                  : '/placeholder.jpg';

              const originalPrice = Math.round(Number(product.price) * 1.85);
              const uniqueKey = product.id
                ? `category-prod-${product.id}`
                : `category-prod-${product.slug || 'frame'}-${idx}`;

              return (
                <Link
                  key={uniqueKey}
                  href={`/product/${product.slug}`}
                  className="group relative bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl overflow-hidden hover:shadow-2xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  {/* Image Showcase */}
                  <div className="w-full aspect-[4/3] sm:aspect-square bg-slate-100 relative overflow-hidden flex items-center justify-center p-2.5 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200/60">
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Tags */}
                    <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex flex-wrap gap-1 sm:gap-2">
                      {product.audience && (
                        <span className="bg-slate-950/90 text-amber-300 text-[8px] sm:text-[10px] font-black px-2 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase tracking-wider shadow-sm">
                          {product.audience}
                        </span>
                      )}
                      {product.category && (
                        <span className="bg-white/90 text-slate-800 text-[8px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full uppercase tracking-wider border border-slate-200/70 hidden sm:inline-block">
                          {product.category}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-3 sm:p-5 flex flex-col gap-1.5 sm:gap-2 flex-1 justify-between bg-white">
                    <div>
                      <h3 className="text-xs sm:text-base font-black text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-slate-500 text-xs line-clamp-2 mt-1 leading-relaxed hidden sm:block">
                        {product.description || 'Hand-crafted premium frame.'}
                      </p>
                    </div>

                    {/* Price & CTA */}
                    <div className="pt-2 border-t border-slate-100 mt-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-1 sm:gap-1.5">
                          <span className="text-sm sm:text-xl font-black text-slate-950">
                            ₹{product.price}
                          </span>
                          <span className="text-[10px] sm:text-xs font-semibold text-slate-400 line-through">
                            ₹{originalPrice}
                          </span>
                        </div>
                        <span className="text-[9px] sm:text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/80">
                          In Stock
                        </span>
                      </div>

                      {/* Premium Sleek View Button */}
                      <div className="mt-2.5 w-full py-2 px-3 rounded-xl bg-slate-950 group-hover:bg-amber-500 text-white group-hover:text-slate-950 font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 transition-all duration-300 shadow-sm">
                        <span>View Frame</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
