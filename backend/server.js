// ⚠️ Top par dotenv config hona zaroori hai
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const supabase = require('./lib/supabase');

const app = express();

// 1. CORS Allowed (Production & Localhost Both)
app.use(cors());

// 2. Base64 Images ke liye Body Limit 50mb
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Root Test Route
app.get('/', (req, res) => {
  res.send('Eyewear Backend API with Supabase is Running Successfully!');
});

// -------------------------------------------------------------
// GET: Sabhi products fetch karein
// -------------------------------------------------------------
app.get('/api/products', async (req, res) => {
  try {
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      console.error('Supabase GET Error:', error.message);
      return res.status(500).json({ error: error.message });
    }
    res.json(data);
  } catch (err) {
    console.error('Server GET Error:', err);
    res.status(500).json({ error: 'Server Internal Error' });
  }
});

// -------------------------------------------------------------
// POST: Naya product add karein (Includes 'audience' field)
// -------------------------------------------------------------
app.post('/api/products', async (req, res) => {
  try {
    const { name, price, description, images, slug, category, audience } =
      req.body;

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
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json(data);
  } catch (err) {
    console.error('Server Internal Error:', err);
    res.status(500).json({ error: 'Server Internal Error' });
  }
});

// -------------------------------------------------------------
// UPDATE: Product update karein
// -------------------------------------------------------------
app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, images, slug, category, audience } =
      req.body;

    // Check if ID is numeric or string/UUID
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
        audience: audience || 'unisex',
      })
      .eq('id', queryId)
      .select();

    if (error) {
      console.error('Supabase PUT Error:', error.message);
      return res.status(400).json({ error: error.message });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error('Server Update Error:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// -------------------------------------------------------------
// DELETE: Product delete karein (Fixed for Integer & UUID IDs)
// -------------------------------------------------------------
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`[DELETE REQUEST] Received ID: ${id}`);

    // Fallback: Check if ID should be passed as Number or String
    const queryId = !isNaN(Number(id)) ? Number(id) : id;

    const { data, error } = await supabase
      .from('products')
      .delete()
      .eq('id', queryId)
      .select();

    if (error) {
      console.error('Supabase Delete Error:', error.message);
      return res.status(400).json({ error: error.message });
    }

    if (!data || data.length === 0) {
      console.warn(`Product with ID ${id} not found in database.`);
      return res.status(404).json({ error: 'Product not found with given ID' });
    }

    console.log(`[DELETE SUCCESS] Product ID ${id} deleted.`);
    res
      .status(200)
      .json({ message: 'Product deleted successfully', deleted: data });
  } catch (err) {
    console.error('Server Delete Catch Error:', err);
    res.status(500).json({ error: 'Server Internal Error during deletion' });
  }
});

// 🚀 Render Deployment Dynamic PORT Support
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
