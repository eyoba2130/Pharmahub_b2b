const express = require('express');
const { register, login, getWholesalers } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/wholesalers', authMiddleware, getWholesalers); // ለCreateOrder

module.exports = router;