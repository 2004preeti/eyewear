'use client';
import { useState } from 'react';

const CATEGORIES = [
  { label: 'Select Category', value: '' },
  { label: 'Eyeglasses', value: 'eyeglasses' },
  { label: 'Sunglasses', value: 'sunglasses' },
  { label: 'Reading Glasses', value: 'reading' },
  { label: 'Computer Glasses', value: 'computer' },
  { label: 'Premium Frames', value: 'premium' },
];

export default function AdminPage() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    slug: '',
    category: '',
  });

  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<string[]>([]);

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
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      const responseData = await res.json();

      if (res.ok) {
        alert('🎉 Product Added Successfully!');
        setFormData({
          name: '',
          price: '',
          description: '',
          slug: '',
          category: '',
        });
        setImageFiles([]);
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

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 text-black">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl border border-gray-200 shadow-xl">
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

          {/* Price & Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
    </div>
  );
}
