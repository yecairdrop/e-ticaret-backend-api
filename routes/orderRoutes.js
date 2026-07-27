const express = require('express');
const router = express.Router();
const { createOrder, getUserOrders } = require('../controllers/orderController');

// Kullanıcının sipariş geçmişini getir
router.get('/:user_id', getUserOrders);

// Sepeti siparişe dönüştür
router.post('/', createOrder);

module.exports = router;