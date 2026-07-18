const express = require('express');
const { createOrder, getMyOrders, updateOrderStatus } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);
router.post('/create', createOrder);
router.get('/', getMyOrders);
router.put('/:id/status', updateOrderStatus);

module.exports = router;