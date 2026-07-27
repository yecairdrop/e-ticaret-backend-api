const express = require('express');
const router = express.Router();

// Controller'dan 4 fonksiyonu da içeri alıyoruz
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');

// Ürünleri Listeleme (GET)
router.get('/', getProducts);

// Yeni Ürün Ekleme (POST)
router.post('/', createProduct);

// Ürün Güncelleme (PUT) - Dikkat: Hangi ürün olduğunu ID ile belirtiyoruz (örnek: /api/products/1)
router.put('/:id', updateProduct);

// Ürün Silme (DELETE) - Hangi ürün silinecekse ID'sini veriyoruz
router.delete('/:id', deleteProduct);

module.exports = router;