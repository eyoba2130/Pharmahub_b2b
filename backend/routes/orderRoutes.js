import express from 'express';
import {authMiddleware} from  "../middleware/authMiddleware.js";
import { createOrder, getOrders, updateOrderStatus } from '../controllers/orderController.js';

const router = express.Router();

router.use(authMiddleware);
router.post('/', createOrder);
router.get('/', getOrders);
router.put('/:id', updateOrderStatus);

export default router;