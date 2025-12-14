require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// --- 1. IMPORT ROUTES (Baru) ---
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Koneksi ke MongoDB Atlas Berhasil!');
  } catch (err) {
    console.error('❌ GAGAL KONEKSI:', err.message);
    process.exit(1);
  }
};

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API Server Berjalan!',
    praktikum: 'P10: Simulasi API Key & OAuth 2.0',
    by: 'Aisyah Safitri - 230104040117'
  });
});

// --- 2. GUNAKAN ROUTES (Baru) ---
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/auth', authRoutes);

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  });
};

connectDB().then(startServer);