require('dotenv').config();
const supabase = require('./lib/supabase');

async function test() {
  console.log("Testing Supabase connection with URL:", process.env.SUPABASE_URL);
  try {
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Success, data length:', data.length);
    }
  } catch (err) {
    console.error('Catch Error:', err);
  }
}
test();
