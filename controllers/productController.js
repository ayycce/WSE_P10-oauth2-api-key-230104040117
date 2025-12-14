const Product = require('../models/Product');

// Handler untuk Public (Read-Only)
const getPublicProducts = async (req, res) => {
  try {
    // Ambil semua produk, tapi sembunyikan field versi (__v)
    const products = await Product.find().select('-__v');

    // Ambil nama pemilik key dari middleware tadi
    const keyOwner = req.apiKey ? req.apiKey.owner : 'Unknown';

    res.status(200).json({
      message: `✅ Daftar Produk berhasil diambil. Diakses oleh: ${keyOwner}`,
      total: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data produk.' });
  }
};

module.exports = { getPublicProducts };

// --- HANDLER PRIVAT (Butuh Token & Role Admin) ---

// 1. CREATE Product (POST)
const createProduct = async (req, res) => {
  const { id, role } = req.user; // Data dari token

  // Cek Role: Hanya Admin boleh masuk
  if (role !== 'admin') {
    return res.status(403).json({ message: '⛔ Dilarang: Hanya Admin yang boleh menambah produk.' });
  }

  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      message: `✅ Produk berhasil dibuat oleh Admin (ID: ${id})`,
      data: newProduct
    });
  } catch (error) {
    res.status(400).json({ message: 'Gagal membuat produk.', error: error.message });
  }
};

// 2. UPDATE Product (PUT)
const updateProduct = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: '⛔ Dilarang: Hanya Admin yang boleh edit produk.' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );

    if (!updatedProduct) return res.status(404).json({ message: 'Produk tidak ditemukan.' });

    res.status(200).json({
      message: '✅ Produk berhasil diperbarui.',
      data: updatedProduct
    });
  } catch (error) {
    res.status(400).json({ message: 'Gagal update produk.', error: error.message });
  }
};

// 3. DELETE Product (DELETE)
const deleteProduct = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: '⛔ Dilarang: Hanya Admin yang boleh hapus produk.' });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Produk tidak ditemukan.' });

    res.status(200).json({ message: '✅ Produk berhasil dihapus.' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal hapus produk.' });
  }
};

// Jangan lupa update module.exports di paling bawah!
module.exports = { 
  getPublicProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct 
};