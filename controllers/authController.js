const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// Handler untuk Login (Token Grant)
// POST /api/v1/auth/token
const authUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Cari pengguna berdasarkan username
    const user = await User.findOne({ username });

    // 2. Validasi: Apakah usernya ada? DAN Apakah passwordnya cocok?
    // (Method matchPassword berasal dari Model User yang kita buat di Langkah 2)
    if (user && (await user.matchPassword(password))) {
      
      // 3. Jika valid, cetak tokennya
      const token = generateToken(user._id, user.role);

      // 4. Kirim token ke user
      res.status(200).json({
        message: 'Login Berhasil!',
        token_type: 'Bearer',
        access_token: token,
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
        }
      });
    } else {
      // Jika salah password atau user tidak ketemu
      res.status(401).json({
        message: '⛔ Otentikasi Gagal: Username atau Password salah.'
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error saat Login' });
  }
};

module.exports = { authUser };