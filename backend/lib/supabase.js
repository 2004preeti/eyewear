// 1. Sabse pehle dotenv load hona chahiye
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// 2. Environment Variables Read Karein
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// 3. Safety Check: Terminal par turant batayega agar keys missing hui
if (!supabaseUrl || !supabaseKey) {
  console.error(
    '❌ CRITICAL ERROR: .env file se SUPABASE_URL ya SUPABASE_ANON_KEY load nahi ho paya!',
  );
  console.error(
    'Check karein ki .env file backend ke root folder mein hi rakhi hai.',
  );
}

// 4. Extra URL Formatting (Trailing slash '/' ko remove karna taaki fetch fail na ho)
const formattedUrl = supabaseUrl ? supabaseUrl.trim().replace(/\/$/, '') : '';

const supabase = createClient(formattedUrl, supabaseKey);

module.exports = supabase;
