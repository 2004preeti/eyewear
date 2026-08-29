import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET all products
export async function GET() {
  try {
    const { data, error } = await supabase.from('products').select('*');
    
    if (error) {
      console.error('Supabase GET Error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error('Server GET Error:', error);
    return NextResponse.json({ error: 'Server Internal Error' }, { status: 500 });
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
