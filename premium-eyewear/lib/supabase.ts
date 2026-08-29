import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://cbrltoehzkenitfoxxpb.supabase.co';

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNicmx0b2Voemtlbml0Zm94eHBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyMzU1NjEsImV4cCI6MjA5ODgxMTU2MX0.itZt2fISKEvh5TA9g9hESQRZr43Q-aVzVSn8HO_e4BE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
