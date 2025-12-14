const express = require('express');
const { authUser } = require('../controllers/authController');

const router = express.Router();

// Endpoint untuk Login dan mendapatkan Token
router.post('/token', authUser);

module.exports = router;