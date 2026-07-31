'use client';
import { useState, useEffect, use } from 'react';
import Link from 'next/link';

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Unwrap params using React.use
  const { slug } = use(params);

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(
          'https://eyewear-3zv6.onrender.com/api/products',
          {
            cache: 'no-store',
          },
        );
        if (res.ok) {
          const products = await res.json();
          const found = products.find((item: any) => item.slug === slug);
          if (found) {
            setProduct(found);
            const firstImg =
              found.images && found.images.length > 0
                ? found.images[0]
                : '/placeholder.jpg';
            setSelectedImage(firstImg);
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-28 text-center min-h-[60vh] flex items-center justify-center">
        <p className="text-xl font-bold animate-pulse">
          Loading Product Details...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-28 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-black mb-4">Product Not Found!</h1>
        <p className="text-gray-500 mb-6">Yeh product available nahi hai.</p>
        <Link
          href="/shop/all"
          className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-yellow-500 hover:text-black transition-all"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const images =
    product.images && product.images.length > 0
      ? product.images
      : ['/placeholder.jpg'];

  // 💬 WhatsApp Share Handler (Product Name, Price & Page URL Share hoga)
  const handleWhatsAppShare = () => {
    const currentUrl =
      typeof window !== 'undefined' ? window.location.href : '';
    const message = `Check out this amazing eyewear: *${product.name}*\nPrice: ₹${product.price}\n\nBuy it here: ${currentUrl}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-28 max-w-7xl">
      <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
        {/* 📸 LEFT SIDE: MULTI-IMAGE GALLERY WITH THUMBNAIL CLICK */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          {/* Main Large Image */}
          <div className="w-full h-[400px] md:h-[500px] bg-gray-50 rounded-[2rem] overflow-hidden relative border border-gray-100 shadow-sm flex items-center justify-center">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
          </div>

          {/* Thumbnails (Click karne pe badi image change hogi) */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-4 mt-2">
              {images.map((img: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`h-24 bg-gray-50 rounded-2xl overflow-hidden relative border-2 shadow-sm transition-all ${
                    selectedImage === img
                      ? 'border-black scale-95'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumb ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 📝 RIGHT SIDE: DETAILS & WHATSAPP SHARE */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          {product.category && (
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
              {product.category}
            </span>
          )}

          <h1 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 leading-tight">
            {product.name}
          </h1>

          <p className="text-3xl font-extrabold text-yellow-600 mb-6">
            ₹{product.price}
          </p>

          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            {product.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-500 hover:text-black transition-all shadow-lg">
                Add to Cart
              </button>
              <button className="flex-1 border-2 border-black bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all">
                Buy Now
              </button>
            </div>

            {/* 🟢 WHATSAPP SHARE BUTTON */}
            <button
              onClick={handleWhatsAppShare}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-full flex items-center justify-center gap-3 transition-all shadow-md mt-2"
            >
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              Share on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
