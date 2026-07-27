const express = require('express');
const router = express.Router();

// Hem kayıt ol (register) hem de giriş yap (login) fonksiyonlarını içeri alıyoruz
const { register, login } = require('../controllers/authController');

// 1. Kapı: Kayıt olma adresi
router.post('/register', register);

// 2. Kapı: Yeni eklediğimiz Giriş yapma adresi
router.post('/login', login);

module.exports = router;