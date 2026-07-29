const express = require('express');
const router = express.Router();
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');

// DÜZELTME BURADA: Süslü parantezleri ({}) kaldırdık çünkü dosyadan direkt fonksiyon geliyor!
const verifyToken = require('../middleware/authMiddleware');
const verifyAdmin = require('../middleware/adminMiddleware'); 
const upload = require('../config/cloudinaryConfig'); 

// Ürün Ekleme
router.post('/', verifyToken, verifyAdmin, upload.single('image'), createProduct);

// Diğer rotalar aynı
router.get('/', getProducts);
router.put('/:id', verifyToken, verifyAdmin, updateProduct);
router.delete('/:id', verifyToken, verifyAdmin, deleteProduct);

module.exports = router;