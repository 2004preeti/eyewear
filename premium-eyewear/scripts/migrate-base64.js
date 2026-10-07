const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cbrltoehzkenitfoxxpb.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNicmx0b2Voemtlbml0Zm94eHBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyMzU1NjEsImV4cCI6MjA5ODgxMTU2MX0.itZt2fISKEvh5TA9g9hESQRZr43Q-aVzVSn8HO_e4BE';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

async function migrate() {
  console.log('🔄 Fetching all products from Supabase...');
  const { data: products, error } = await supabase.from('products').select('*');

  if (error) {
    console.error('❌ Failed to fetch products:', error.message);
    return;
  }

  console.log(`📦 Found ${products.length} products to check.`);
  let migratedCount = 0;

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    if (!p.images || !Array.isArray(p.images) || p.images.length === 0) {
      continue;
    }

    let hasBase64 = false;
    const newImages = [];

    for (let imgIdx = 0; imgIdx < p.images.length; imgIdx++) {
      const img = p.images[imgIdx];

      if (typeof img === 'string' && img.startsWith('data:image/')) {
        hasBase64 = true;
        // Parse mime & base64
        const matches = img.match(/^data:image\/([a-zA-Z0-9+.-]+);base64,(.+)$/);
        let ext = 'webp';
        let base64Data = '';

        if (matches) {
          ext = matches[1].replace('jpeg', 'jpg');
          base64Data = matches[2];
        } else {
          // fallback split
          const parts = img.split(',');
          base64Data = parts[1] || parts[0];
        }

        const safeSlug = (p.slug || p.name || `product-${i}`)
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '-')
          .replace(/-+/g, '-')
          .slice(0, 35);

        const fileName = `${safeSlug}-${imgIdx + 1}.${ext}`;
        const filePath = path.join(uploadsDir, fileName);

        // Save binary file
        const buffer = Buffer.from(base64Data, 'base64');
        fs.writeFileSync(filePath, buffer);

        newImages.push(`/uploads/${fileName}`);
      } else {
        newImages.push(img);
      }
    }

    if (hasBase64) {
      // Update in Supabase
      const { error: updateError } = await supabase
        .from('products')
        .update({ images: newImages })
        .eq('slug', p.slug);

      if (updateError) {
        console.error(`❌ Failed to update product ${p.name}:`, updateError.message);
      } else {
        migratedCount++;
        console.log(`✅ [${migratedCount}/${products.length}] Migrated: ${p.name} -> ${newImages[0]}`);
      }
    }
  }

  console.log(`\n🎉 Migration Complete! ${migratedCount} products migrated from heavy Base64 to lightning-fast files.`);
}

migrate();
