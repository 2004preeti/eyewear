import Link from 'next/link';
import Image from 'next/image';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  // 1. Express + Supabase Backend se products fetch karein
  let allProducts = [];
  try {
    const res = await fetch('/api/products', {
      cache: 'no-store', // Fresh data ensure karne ke liye
    });
    if (res.ok) {
      allProducts = await res.json();
    }
  } catch (error) {
    console.error('Failed to fetch category products:', error);
  }

  // 2. 🔍 FLEXIBLE MATCHING FOR BOTH "CATEGORY" AND "AUDIENCE"
  const products = allProducts.filter((product: any) => {
    const targetQuery = category.toLowerCase().trim();

    // Check if category matches
    const categoryMatch =
      product.category &&
      product.category.toLowerCase().trim().includes(targetQuery);

    // Check if target audience (Men/Women/Kids) matches
    const audienceMatch =
      product.audience && product.audience.toLowerCase().trim() === targetQuery;

    // Dono me se koi bhi true hoga, product show ho jayega
    return categoryMatch || audienceMatch;
  });

  return (
    <div className="container mx-auto px-4 py-28 min-h-[70vh]">
      <h1 className="text-5xl font-extrabold capitalize mb-12 text-center text-gray-900">
        {category} Collection
      </h1>

      {products.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm p-8 max-w-3xl mx-auto">
          <p className="text-xl text-gray-500 mb-6">
            No products found for{' '}
            <span className="font-bold text-black capitalize">
              "{category}"
            </span>
            .
          </p>
          <Link
            href="/admin"
            className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-yellow-500 hover:text-black transition-all shadow-md inline-block"
          >
            Add Products in Admin Panel
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product: any) => {
            const imageUrl =
              product.images && product.images.length > 0
                ? product.images[0]
                : '/placeholder.jpg';

            return (
              <div
                key={product.id || product._id}
                className="group border border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 bg-white"
              >
                <div className="h-72 bg-gray-50 relative overflow-hidden flex items-center justify-center">
                  {imageUrl.startsWith('http') ||
                  imageUrl.startsWith('data:') ? (
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    />
                  ) : (
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-all duration-500"
                    />
                  )}
                  {/* Target Audience Badge */}
                  {product.audience && (
                    <span className="absolute top-4 left-4 bg-black/80 text-white text-xs font-bold px-3 py-1 rounded-full uppercase z-10 shadow-sm">
                      {product.audience}
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-yellow-600 font-extrabold text-lg mt-2">
                    ₹{product.price}
                  </p>
                  <Link
                    href={`/product/${product.slug}`}
                    className="block mt-5 bg-black text-white text-center py-3 rounded-full font-bold hover:bg-yellow-500 hover:text-black transition-all shadow-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
