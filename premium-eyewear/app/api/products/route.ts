import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Product } from '@/lib/models/Product';

// Saare products get karne ke liye
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({});
    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Naya product add karne ke liye
export async function POST(req: Request) {
  try {
    // 1. Pehle database connection ensure karein
    await connectDB();

    // 2. Request body se JSON data nikaalein
    const body = await req.json();

    // 3. Choti si validation check
    if (!body.name || !body.price || !body.slug) {
      return NextResponse.json(
        { error: 'Required fields missing (name, price, slug)' },
        { status: 400 },
      );
    }

    // 4. Database mein product create karein
    const newProduct = await Product.create(body);

    // 5. Success response return karein
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    console.error('POST Error Details:', error);
    return NextResponse.json(
      { error: error.message || 'Product add nahi ho paya' },
      { status: 500 },
    );
  }
}
