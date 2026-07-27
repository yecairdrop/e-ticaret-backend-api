const express = require('express');
const router = express.Router();
const { updateUserProfile } = require('../controllers/userController');

// Profili güncelle
router.put('/:id', updateUserProfile);

module.exports = router;