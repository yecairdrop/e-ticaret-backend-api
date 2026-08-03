const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, updateUserPassword } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

// Bu rotaların hepsine giriş yapmış olma şartı (verifyToken) ekledik
router.get('/profile', verifyToken, getUserProfile);
router.put('/profile', verifyToken, updateUserProfile);
router.put('/password', verifyToken, updateUserPassword);

module.exports = router;