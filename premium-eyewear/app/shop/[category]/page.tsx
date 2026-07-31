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
    const res = await fetch('https://eyewear-3zv6.onrender.com/api/products', {
      cache: 'no-store', // Fresh data ensure karne ke liye
    });
    if (res.ok) {
      allProducts = await res.json();
    }
  } catch (error) {
    console.error('Failed to fetch category products:', error);
  }

  // 2. Case-insensitive Regex Filter Supabase data ke upar
  const products = allProducts.filter((product: any) => {
    if (!product.category) return false;
    return product.category.toLowerCase().includes(category.toLowerCase());
  });

  return (
    <div className="container mx-auto px-4 py-28">
      <h1 className="text-5xl font-extrabold capitalize mb-12 text-center">
        {category} Collection
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">
          No products found in {category} yet.
        </p>
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
                className="group border rounded-3xl overflow-hidden hover:shadow-2xl transition-all"
              >
                <div className="h-72 bg-gray-100 relative">
                  {imageUrl.startsWith('http') ||
                  imageUrl.startsWith('data:') ? (
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                    />
                  ) : (
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-all duration-300"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <p className="text-yellow-600 font-bold mt-2">
                    ₹{product.price}
                  </p>
                  <Link
                    href={`/product/${product.slug}`}
                    className="block mt-4 bg-black text-white text-center py-2 rounded-full font-bold hover:bg-yellow-500 transition-all"
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
