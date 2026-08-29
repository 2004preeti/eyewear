import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// PUT: Update a product by ID
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, price, description, images, slug, category, audience } = body;

    const queryId = !isNaN(Number(id)) ? Number(id) : id;

    const { data, error } = await supabase
      .from('products')
      .update({
        name,
        price: Number(price),
        description,
        images,
        slug,
        category,
        audience: audience || 'all',
      })
      .eq('id', queryId)
      .select();

    if (error) {
      console.error('Supabase PUT Error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error('Server Update Error:', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

// DELETE: Delete a product by ID
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const queryId = !isNaN(Number(id)) ? Number(id) : id;

    // 1. Try deleting by 'id'
    let { data, error } = await supabase
      .from('products')
      .delete()
      .eq('id', queryId)
      .select();

    // 2. If 'id' column fails or no rows deleted, try matching with 'slug'
    if ((error || !data || data.length === 0) && id) {
      const fallback = await supabase
        .from('products')
        .delete()
        .eq('slug', id)
        .select();

      if (!fallback.error && fallback.data && fallback.data.length > 0) {
        data = fallback.data;
        error = null;
      }
    }

    if (error) {
      console.error('Supabase Delete Error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Product deleted successfully', deleted: data },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Server Delete Error:', error);
    return NextResponse.json(
      { error: 'Server Internal Error during deletion' },
      { status: 500 }
    );
  }
}
