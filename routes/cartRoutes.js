const express = require('express');
const router = express.Router();
const { addToCart, getCart, updateCartItem, removeCartItem } = require('../controllers/cartController');

// Kapıdaki güvenlik görevlimizi (authMiddleware) içeri alıyoruz
const verifyToken = require('../middleware/authMiddleware');

// Rotaların arasına verifyToken ekliyoruz
router.get('/:user_id', verifyToken, getCart);
router.post('/', verifyToken, addToCart);
router.put('/:id', verifyToken, updateCartItem);
router.delete('/:id', verifyToken, removeCartItem);

module.exports = router;