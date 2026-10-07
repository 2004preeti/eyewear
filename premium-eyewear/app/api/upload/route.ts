import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    const formData: any = await req.formData();
    // Accept either 'files', 'images', or single 'file'
    const rawFiles: any[] = [];
    
    if (typeof formData.getAll === 'function') {
      rawFiles.push(...formData.getAll('files'));
      rawFiles.push(...formData.getAll('images'));
    }
    if (typeof formData.get === 'function') {
      const single = formData.get('file');
      if (single) rawFiles.push(single);
    }

    const targetFiles: any[] = [];
    for (const item of rawFiles) {
      if (item && typeof item === 'object' && typeof item.arrayBuffer === 'function') {
        targetFiles.push(item);
      }
    }

    if (targetFiles.length === 0) {
      return NextResponse.json(
        { error: 'No files uploaded' },
        { status: 400 }
      );
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    const uploadedUrls: string[] = [];

    for (const file of targetFiles) {
      if (!file || typeof file === 'string') continue;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Clean file extension or default to .webp / .jpg
      const originalName = file.name || 'image.webp';
      const extMatch = originalName.match(/\.([a-zA-Z0-9]+)$/);
      const ext = extMatch ? `.${extMatch[1].toLowerCase()}` : '.webp';

      // Clean base name for SEO friendly URLs
      const safeBaseName = originalName
        .replace(/\.[^/.]+$/, '')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .slice(0, 30);

      const uniqueSuffix = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const fileName = `${safeBaseName || 'product'}-${uniqueSuffix}${ext}`;
      const filePath = path.join(uploadsDir, fileName);

      await writeFile(filePath, buffer);
      uploadedUrls.push(`/uploads/${fileName}`);
    }

    return NextResponse.json(
      {
        success: true,
        urls: uploadedUrls,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('File Upload Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to upload image' },
      { status: 500 }
    );
  }
}
