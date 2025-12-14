const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  // 1. Cek apakah ada header Authorization dengan format "Bearer <token>"
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      // 2. Ambil tokennya saja (buang kata 'Bearer ')
      const token = authHeader.split(' ')[1];

      // 3. Verifikasi token menggunakan kunci rahasia
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Token valid! Tempelkan data user (id & role) ke request
      req.user = {
        id: decoded.id,
        role: decoded.role
      };

      // 5. Lanjut masuk
      next();
    } catch (error) {
      console.error('Token Error:', error.message);
      return res.status(403).json({ 
        message: '⛔ Akses Ditolak: Token tidak valid atau kedaluwarsa.' 
      });
    }
  } else {
    // Jika tidak ada token sama sekali
    return res.status(403).json({ 
      message: '⛔ Akses Ditolak: Butuh Token Bearer untuk masuk sini.' 
    });
  }
};

module.exports = validateToken;