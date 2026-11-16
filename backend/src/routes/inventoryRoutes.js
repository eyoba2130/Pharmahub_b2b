
import express from 'express';
// 'require' የነበረውን ወደ ES Module import እንቀይረዋለን
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getInventory, addInventory, updateStock, deleteBatch } from '../controllers/inventoryController.js';

const router = express.Router();

router.use(authMiddleware);
router.get('/', getInventory);
router.post('/', addInventory);
router.put('/:id', updateStock);
router.delete('/:id', deleteBatch);

export default router;