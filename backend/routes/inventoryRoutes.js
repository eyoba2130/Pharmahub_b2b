const express = require('express');
const {
    addItem,
    getInventory,
    getExpiryAlerts,
    updateItem,
    deleteItem
} = require('../controllers/inventoryController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);
router.post('/add', addItem);
router.get('/', getInventory);
router.get('/alerts/expiry', getExpiryAlerts);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

module.exports = router;