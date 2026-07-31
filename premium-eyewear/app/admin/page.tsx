'use client';
import { useState, useEffect } from 'react';

const CATEGORIES = [
  { label: 'Select Category', value: '' },
  { label: 'Eyeglasses', value: 'eyeglasses' },
  { label: 'Sunglasses', value: 'sunglasses' },
  { label: 'Reading Glasses', value: 'reading' },
  { label: 'Computer Glasses', value: 'computer' },
  { label: 'Premium Frames', value: 'premium' },
];

const AUDIENCE_OPTIONS = [
  { label: 'All / Unisex', value: 'unisex' },
  { label: 'Men', value: 'men' },
  { label: 'Women', value: 'women' },
  { label: 'Kids', value: 'kids' },
];

export default function AdminPage() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    slug: '',
    category: '',
    audience: 'unisex', // Women / Men / Kids
  });

  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);

  // 1. Live Products Fetch Karein (Table Display & Delete ke liye)
  const fetchProducts = async () => {
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
      console.error('Error fetching products:', error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Automatic Slug Generator
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameVal = e.target.value;
    const generatedSlug = nameVal
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    setFormData({
      ...formData,
      name: nameVal,
      slug: generatedSlug,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const newImages: string[] = [];

      fileArray.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          if (newImages.length === fileArray.length) {
            setImageFiles((prev) => [...prev, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // 2. Submit New Product
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.category) {
      alert('Kripya Category select karein!');
      return;
    }

    if (imageFiles.length === 0) {
      alert('Kripya kam se kam ek product image upload karein!');
      return;
    }

    setLoading(true);

    const productData = {
      ...formData,
      price: Number(formData.price),
      images: imageFiles,
    };

    try {
      const res = await fetch(
        'https://eyewear-3zv6.onrender.com/api/products',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        },
      );

      const responseData = await res.json();

      if (res.ok) {
        alert('🎉 Product Added Successfully!');
        setFormData({
          name: '',
          price: '',
          description: '',
          slug: '',
          category: '',
          audience: 'unisex',
        });
        setImageFiles([]);
        fetchProducts(); // Refresh list after add
      } else {
        alert(
          `Failed to add product: ${responseData.error || 'Unknown Error'}`,
        );
      }
    } catch (error) {
      console.error(error);
      alert('Network Error! Backend server running hai ya nahi check karein.');
    } finally {
      setLoading(false);
    }
  };

  // 3. 🗑️ DELETE PRODUCT FUNCTION
  const handleDeleteProduct = async (id: string, name: string) => {
    const confirmDelete = confirm(
      `Kya aap "${name}" ko sach me delete karna chahte hain?`,
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `https://eyewear-3zv6.onrender.com/api/products/${id}`,
        {
          method: 'DELETE',
        },
      );

      if (res.ok) {
        alert('✅ Product Deleted Successfully!');
        // UI se product remove karein
        setProducts((prev) =>
          prev.filter((item) => (item.id || item._id) !== id),
        );
      } else {
        alert('Failed to delete product!');
      }
    } catch (error) {
      console.error('Delete Error:', error);
      alert('Network error while deleting product.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 text-black">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* FORM CONTAINER */}
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl">
          <h1 className="text-3xl font-black mb-6 text-black border-b pb-4">
            Add New Product
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Product Name */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-800">
                Product Name
              </label>
              <input
                required
                value={formData.name}
                placeholder="e.g. Aviator Classic Gold"
                className="border border-gray-300 p-3 rounded-xl text-black bg-white focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-400"
                onChange={handleNameChange}
              />
            </div>

            {/* Price, Category & Audience Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-800">
                  Price (₹)
                </label>
                <input
                  required
                  type="number"
                  value={formData.price}
                  placeholder="1299"
                  className="border border-gray-300 p-3 rounded-xl text-black bg-white focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-400"
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>

              {/* CATEGORY DROPDOWN */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-800">
                  Category
                </label>
                <select
                  required
                  value={formData.category}
                  className="border border-gray-300 p-3 rounded-xl text-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  {CATEGORIES.map((cat) => (
                    <option
                      key={cat.value}
                      value={cat.value}
                      className="text-black"
                    >
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 🧑‍🤝‍🧑 AUDIENCE DROPDOWN (Men / Women / Kids) */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-800">
                  Target Audience
                </label>
                <select
                  required
                  value={formData.audience}
                  className="border border-gray-300 p-3 rounded-xl text-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
                  onChange={(e) =>
                    setFormData({ ...formData, audience: e.target.value })
                  }
                >
                  {AUDIENCE_OPTIONS.map((opt) => (
                    <option
                      key={opt.value}
                      value={opt.value}
                      className="text-black"
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Slug */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-800">
                Product Slug (URL Path)
              </label>
              <input
                required
                value={formData.slug}
                placeholder="aviator-classic-gold"
                className="border border-gray-200 p-3 rounded-xl bg-gray-50 text-gray-700 focus:outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-800">
                Description
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                placeholder="High quality metal frame with polarized lenses..."
                className="border border-gray-300 p-3 rounded-xl text-black bg-white focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-400"
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            {/* Image Upload */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-800">
                Upload Product Images
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                className="border border-gray-300 p-2 rounded-xl text-black bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
                onChange={handleImageChange}
              />
            </div>

            {/* Previews */}
            {imageFiles.length > 0 && (
              <div className="flex gap-3 overflow-x-auto py-2">
                {imageFiles.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img}
                      alt="preview"
                      className="w-20 h-20 object-cover rounded-xl border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center font-bold shadow-md hover:bg-red-600"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white font-bold py-4 rounded-xl hover:bg-yellow-500 hover:text-black transition-all disabled:bg-gray-400 mt-2 shadow-lg"
            >
              {loading ? 'Adding Product...' : 'Submit Product'}
            </button>
          </form>
        </div>

        {/* 📋 EXISTING PRODUCTS TABLE & DELETE SECTION */}
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl">
          <h2 className="text-2xl font-black mb-6 text-black border-b pb-4 flex justify-between items-center">
            <span>Manage Products ({products.length})</span>
            <button
              onClick={fetchProducts}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-black px-3 py-1.5 rounded-lg font-bold"
            >
              Refresh List
            </button>
          </h2>

          {fetching ? (
            <p className="text-gray-500 text-center py-4 animate-pulse">
              Loading products list...
            </p>
          ) : products.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No products found in database.
            </p>
          ) : (
            <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto pr-2">
              {products.map((item: any) => {
                const id = item.id || item._id;
                const thumb =
                  item.images && item.images.length > 0
                    ? item.images[0]
                    : '/placeholder.jpg';

                return (
                  <div
                    key={id}
                    className="py-4 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={thumb}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-xl border bg-gray-50"
                      />
                      <div>
                        <h3 className="font-bold text-gray-900">{item.name}</h3>
                        <p className="text-xs text-gray-500">
                          Category:{' '}
                          <span className="font-semibold text-black uppercase">
                            {item.category}
                          </span>{' '}
                          | Audience:{' '}
                          <span className="font-semibold text-black uppercase">
                            {item.audience || 'unisex'}
                          </span>{' '}
                          | Price:{' '}
                          <span className="font-bold text-yellow-600">
                            ₹{item.price}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* 🗑️ Delete Button */}
                    <button
                      onClick={() => handleDeleteProduct(id, item.name)}
                      className="bg-red-50 hover:bg-red-500 text-red-600 hover:text-white border border-red-200 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm flex items-center gap-1.5 shrink-0"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
