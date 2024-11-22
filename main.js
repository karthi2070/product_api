const express = require('express');
const sequelize = require('./db');
const Product = require('./Product');

const app = express();
const port = 6969;

// Middleware to parse JSON requests
app.use(express.json());

app.post('/products', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const newProduct = await Product.create({ name, description, price });
    res.status(201).json(newProduct);
    }catch (error) {
    res.status(500).json({ error: 'Failed to create product', details: error });
  }
});

//READ
app.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products', details: error.message });
  }
});

//Get a product by ID
  app.get('/products/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch product', details: error.message });
    }
  });
//update
app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const product = await Product.findByPk(id);
    if (product) {
      product.name = name ;
      product.description = description ;
      product.price = price ;
      await product.save();
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product', details: error.message });
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (product) {
      await product.destroy();
      res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product', details: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
