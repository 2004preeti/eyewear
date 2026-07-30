// ⚠️ IMPORTANT: Top par dotenv config hona zaroori hai
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const supabase = require('./lib/supabase');

const app = express();

// 1. CORS Allowed
app.use(cors());

// 2. Base64 Images ke liye Body Limit 50mb
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Root Test Route
app.get('/', (req, res) => {
  res.send('Eyewear Backend API with Supabase is Running Successfully!');
});

// GET: Sabhi products
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

// POST: Naya product
app.post('/api/products', async (req, res) => {
  try {
    const { name, price, description, images, slug, category } = req.body;

    const { data, error } = await supabase
      .from('products')
      .insert([{ name, price, description, images, slug, category }])
      .select();

    if (error) {
      console.error('Supabase POST Error:', error);
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json(data);
  } catch (err) {
    console.error('Server Internal Error:', err);
    res.status(500).json({ error: 'Server Internal Error' });
  }
});

// UPDATE: Product update
app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, images, slug, category } = req.body;

    const { data, error } = await supabase
      .from('products')
      .update({ name, price, description, images, slug, category })
      .eq('id', id)
      .select();

    if (error) return res.status(400).json({ error: error.message });
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// DELETE: Product delete
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
      .select();

    if (error) return res.status(400).json({ error: error.message });
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted', deleted: data });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
