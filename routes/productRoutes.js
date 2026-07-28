const express = require('express');
const router = express.Router();

// Controller'dan 4 fonksiyonu da içeri alıyoruz
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');

// Güvenlik kapılarımızı içeri alıyoruz (Az önce oluşturduğumuz iki dosya)
const verifyToken = require('../middleware/authMiddleware'); 
const verifyAdmin = require('../middleware/adminMiddleware');

// Ürünleri Listeleme (GET) - Herkese açık, koruma yok
router.get('/', getProducts);

// Yeni Ürün Ekleme (POST) - Önce giriş yapmış mı (verifyToken), sonra admin mi (verifyAdmin) kontrol et
router.post('/', verifyToken, verifyAdmin, createProduct);

// Ürün Güncelleme (PUT) - Önce giriş, sonra admin kontrolü
router.put('/:id', verifyToken, verifyAdmin, updateProduct);

// Ürün Silme (DELETE) - Önce giriş, sonra admin kontrolü
router.delete('/:id', verifyToken, verifyAdmin, deleteProduct);

module.exports = router;