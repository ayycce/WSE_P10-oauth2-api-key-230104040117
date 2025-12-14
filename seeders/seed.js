require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const ApiKey = require('../models/ApiKey');
const Product = require('../models/Product');

const MONGODB_URI = process.env.MONGODB_URI;

// Data Awal
const products = [
  { name: 'Laptop Gaming Pro', price: 15000000, stock: 10, description: 'Laptop performa tinggi.' },
  { name: 'Monitor 4K Ultra', price: 5000000, stock: 25, description: 'Monitor resolusi tajam.' },
  { name: 'Keyboard Mekanik', price: 1500000, stock: 50, description: 'Keyboard switch tactile.' }
];

const users = [
  { username: 'admin', password: 'password123', role: 'admin' },
  { username: 'userbiasa', password: 'userpass', role: 'user' }
];

const apiKeys = [
  { key: 'PRACTICUM_API_KEY_A_1234567890', owner: 'App Client A', status: 'active' },
  { key: 'PUBLIC_VIEW_ONLY_KEY_B_ABCDEFG', owner: 'App Client B', status: 'active' }
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Koneksi MongoDB Berhasil');

    // Hapus data lama (bersih-bersih)
    await Product.deleteMany();
    await User.deleteMany();
    await ApiKey.deleteMany();
    console.log('🧹 Data lama berhasil dihapus');

    // Masukkan data baru
    await Product.insertMany(products);
    console.log(`[+] Produk (${products.length} item) berhasil dimasukkan.`);

    // Masukkan User satu per satu agar password ter-hash
    for (const userData of users) {
      const user = new User(userData);
      await user.save();
    }
    console.log(`[+] User (${users.length} item) berhasil dimasukkan.`);

    await ApiKey.insertMany(apiKeys);
    console.log(`[+] API Key (${apiKeys.length} item) berhasil dimasukkan.`);

    console.log('\n✨ Proses Seeding Selesai! ✨');
    process.exit();
  } catch (error) {
    console.error('❌ Gagal Seeding:', error);
    process.exit(1);
  }
};

seedDB();