import Image from 'next/image';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // 1. Express + Supabase API se sabhi products fetch karein
  let products = [];
  try {
    const res = await fetch('http://localhost:5000/api/products', {
      cache: 'no-store', // taaki fresh data mile
    });
    if (res.ok) {
      products = await res.json();
    }
  } catch (error) {
    console.error('Failed to fetch product details:', error);
  }

  // 2. Slug ke hisab se exact product match karein
  const product = products.find((item: any) => item.slug === slug);

  // 3. Agar product na mile toh Not Found message dikhayein
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-28 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found!</h1>
        <p className="text-gray-500">
          The requested eyewear slug "{slug}" does not exist.
        </p>
      </div>
    );
  }

  // Image URL Fallback handling
  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0]
      : '/placeholder.jpg';

  return (
    <div className="container mx-auto px-4 py-28 grid md:grid-cols-2 gap-12">
      {/* Product Image */}
      <div className="h-[500px] bg-gray-100 rounded-[2rem] relative overflow-hidden">
        {imageUrl.startsWith('http') || imageUrl.startsWith('data:') ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* Product Details */}
      <div>
        <h1 className="text-5xl font-black mb-4">{product.name}</h1>
        <p className="text-2xl font-bold text-yellow-600 mb-6">
          ₹{product.price}
        </p>
        <p className="text-gray-600 mb-8 leading-relaxed">
          {product.description}
        </p>

        <div className="flex gap-4">
          <button className="bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-yellow-500 transition-all">
            Add to Cart
          </button>
          <button className="border border-black px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-all">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
