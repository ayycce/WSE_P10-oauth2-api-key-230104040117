const ApiKey = require('../models/ApiKey');

const validateApiKey = async (req, res, next) => {
  // 1. Ambil key dari header (bisa x-api-key atau api-key)
  const apiKey = req.header('x-api-key');

  // 2. Cek apakah key ada dikirim?
  if (!apiKey) {
    return res.status(401).json({
      message: '⛔ Akses Ditolak: API Key tidak ditemukan di header (x-api-key).'
    });
  }

  try {
    // 3. Cari key di database dan pastikan statusnya 'active'
    const existingKey = await ApiKey.findOne({ key: apiKey, status: 'active' });

    if (!existingKey) {
      return res.status(401).json({
        message: '⛔ Akses Ditolak: API Key tidak valid atau sudah dicabut.'
      });
    }

    // 4. (Opsional) Tempelkan info pemilik key ke request biar bisa dipakai nanti
    req.apiKey = existingKey;

    // 5. Lanjut ke proses berikutnya (Controller)
    next();
  } catch (error) {
    console.error('API Key Error:', error);
    res.status(500).json({ message: 'Internal Server Error saat validasi Key' });
  }
};

module.exports = validateApiKey;