const express = require('express');
const { 
  getPublicProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');

// Import Middleware
const validateApiKey = require('../middleware/validateApiKey');
const validateToken = require('../middleware/validateToken'); // <-- Middleware Token (Langkah 5)

const router = express.Router();

// --- ROUTE PUBLIK (Pakai API Key) ---
router.get('/public', validateApiKey, getPublicProducts);

// --- ROUTE PRIVAT (Pakai Token JWT) ---
// Semua route di bawah ini dijaga oleh validateToken
router.post('/private', validateToken, createProduct);       // Create
router.put('/private/:id', validateToken, updateProduct);    // Update
router.delete('/private/:id', validateToken, deleteProduct); // Delete

module.exports = router;