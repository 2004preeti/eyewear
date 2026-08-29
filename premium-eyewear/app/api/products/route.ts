import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Fallback curated products if Supabase is sleeping/paused or empty
const fallbackProducts = [
  {
    id: 1,
    name: 'Aura Matte Black Titanium',
    price: 2499,
    description: 'Ultra-lightweight aerospace grade Japanese titanium frame designed for everyday comfort.\nFrame Width: 138mm | Bridge: 18mm | Temple: 145mm\nAnti-Glare & UV400 Protection Coating included.',
    images: [
      'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=800&auto=format&fit=crop'
    ],
    slug: 'aura-matte-black-titanium',
    category: 'eyeglasses',
    audience: 'unisex'
  },
  {
    id: 2,
    name: 'Aviator Gold Polarized Shades',
    price: 2999,
    description: 'Iconic teardrop metal frame with polarized green-tinted UV400 sun lenses.\nLens Width: 58mm | Bridge: 14mm | Temple: 140mm\n100% Glare Reduction for driving & outdoors.',
    images: [
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop'
    ],
    slug: 'aviator-gold-polarized-shades',
    category: 'sunglasses',
    audience: 'men'
  },
  {
    id: 3,
    name: 'ProShield BlueCut Screen Optics',
    price: 1899,
    description: 'Ergonomic polycarbonate frame with advanced blue-light filtering technology.\nLens Width: 52mm | Bridge: 17mm | Temple: 142mm\nBlocks 99% harmful screen blue light without distortion.',
    images: [
      'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=800&auto=format&fit=crop'
    ],
    slug: 'proshield-bluecut-screen-optics',
    category: 'computer',
    audience: 'unisex'
  },
  {
    id: 4,
    name: 'Vogue Crystal Tortoise Acetate',
    price: 2799,
    description: 'Hand-polished Italian acetate in warm honey-tortoise pattern with flexible spring hinges.\nFrame Width: 135mm | Bridge: 19mm | Temple: 140mm\nElegant cat-eye silhouette for women.',
    images: [
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=800&auto=format&fit=crop'
    ],
    slug: 'vogue-crystal-tortoise-acetate',
    category: 'eyeglasses',
    audience: 'women'
  },
  {
    id: 5,
    name: 'Urban Hexagonal Gunmetal Frame',
    price: 2299,
    description: 'Modern geometric hexagonal wire frame with ultra-slim temple arms.\nFrame Width: 136mm | Bridge: 20mm | Temple: 145mm\nHigh tensile steel construction.',
    images: [
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=800&auto=format&fit=crop'
    ],
    slug: 'urban-hexagonal-gunmetal-frame',
    category: 'eyeglasses',
    audience: 'men'
  },
  {
    id: 6,
    name: 'Noir Bold Square Acetate',
    price: 2599,
    description: 'Bold chunky square acetate silhouette inspired by modern European fashion houses.\nLens Width: 54mm | Bridge: 18mm | Temple: 145mm\nMaximum style and durability.',
    images: [
      'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=800&auto=format&fit=crop'
    ],
    slug: 'noir-bold-square-acetate',
    category: 'sunglasses',
    audience: 'unisex'
  }
];

// GET all products
export async function GET() {
  try {
    const { data, error } = await supabase.from('products').select('*');
    
    if (error || !data || data.length === 0) {
      console.warn('Supabase not responding or empty, using fallback backup products:', error?.message);
      return NextResponse.json(fallbackProducts, { status: 200 });
    }
    
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error('Server GET Error, using fallback backup:', error);
    return NextResponse.json(fallbackProducts, { status: 200 });
  }
}

// POST a new product
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, price, description, images, slug, category, audience } = body;

    if (!name || !price || !slug) {
      return NextResponse.json(
        { error: 'Required fields missing (name, price, slug)' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          name,
          price: Number(price),
          description,
          images,
          slug,
          category,
          audience: audience || 'unisex',
        },
      ])
      .select();

    if (error) {
      console.error('Supabase POST Error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    console.error('Server POST Error:', error);
    return NextResponse.json(
      { error: 'Server Internal Error' },
      { status: 500 }
    );
  }
}
