const jwt = require('jsonwebtoken');

// Fungsi untuk membuat JSON Web Token (JWT)
const generateToken = (id, role) => {
  // Kita bungkus ID user dan Role-nya ke dalam token
  return jwt.sign(
    { id, role }, 
    process.env.JWT_SECRET, // Kunci rahasia dari .env
    {
      expiresIn: '7d', // Token kedaluwarsa dalam 7 hari
    }
  );
};

module.exports = generateToken;