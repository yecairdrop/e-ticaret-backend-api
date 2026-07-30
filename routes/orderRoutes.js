const express = require('express');
const router = express.Router();
const { createOrder, getUserOrders, getAllOrders, updateOrderStatus } = require('../controllers/orderController');

// Güvenlik görevlilerimiz
const verifyToken = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// 1. Müşteri Rotaları (Sadece giriş yapmış olması yeterli)
router.post('/', verifyToken, createOrder);
router.get('/kullanici/:user_id', verifyToken, getUserOrders);

// 2. ADMİN Rotaları (Hem giriş yapacak hem de rolü 'admin' olacak)
router.get('/admin/all', verifyToken, adminMiddleware, getAllOrders);
router.put('/admin/:id/status', verifyToken, adminMiddleware, updateOrderStatus);

module.exports = router;