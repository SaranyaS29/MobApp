const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Product = require('./models/Product'); // Importing the Product model

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Routes
// GET all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err });
  }
});

// Create a new product
app.post('/api/products', async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Error creating product', error: err });
  }
});

// Root Endpoint
app.get('/api/products/:_id', async (req, res) => {
  const productId = req.params.id;

  try {
    // Fetch the product from the database
    const product = await Product.findById(productId);
    

    // If the product is not found, return a 404 error
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }

    // Return the found product
    res.send(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

// Handle Undefined Routes
app.use((req, res) => {
  res.status(404).send('Route Not Found');
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
