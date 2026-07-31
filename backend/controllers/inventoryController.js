// const Inventory = require('../models/Inventory');

// exports.addItem = async (req, res) => {
//     try {
//         const { medicine_name, batch_number, quantity, unit_price, expiry_date } = req.body;
//         const user_id = req.userId;
//         const id = await Inventory.create({
//             user_id,
//             medicine_name,
//             batch_number,
//             quantity,
//             unit_price,
//             expiry_date
//         });
//         res.status(201).json({ success: true, message: 'መድኃኒት ተጨምሯል', id });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'የሰርቨር ስህተት' });
//     }
// };

// exports.getInventory = async (req, res) => {
//     try {
//         const { search } = req.query;
//         const items = await Inventory.findByUser(req.userId, search);
//         res.json({ success: true, data: items });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'የሰርቨር ስህተት' });
//     }
// };

// exports.getExpiryAlerts = async (req, res) => {
//     try {
//         const alerts = await Inventory.getExpiryAlerts(req.userId);
//         res.json({ success: true, count: alerts.length, data: alerts });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'የሰርቨር ስህተት' });
//     }
// };

// exports.updateItem = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const { medicine_name, batch_number, quantity, unit_price, expiry_date } = req.body;
//         const affected = await Inventory.update(id, { medicine_name, batch_number, quantity, unit_price, expiry_date });
//         if (affected === 0) {
//             return res.status(404).json({ success: false, message: 'ንጥል አልተገኘም' });
//         }
//         res.json({ success: true, message: 'ተሻሽሏል' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'የሰርቨር ስህተት' });
//     }
// };

// exports.deleteItem = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const affected = await Inventory.delete(id);
//         if (affected === 0) {
//             return res.status(404).json({ success: false, message: 'ንጥል አልተገኘም' });
//         }
//         res.json({ success: true, message: 'ተወግዷል' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'የሰርቨር ስህተት' });
//     }
// };



import Inventory from '../models/Inventory.js';
import Medicine from '../models/Medicine.js';

export const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find({ user: req.user._id }).populate('medicine');
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addInventory = async (req, res) => {
  try {
    const { medicineId, batchNumber, quantity, expiryDate, price, minStockLevel, location } = req.body;
    // check if medicine exists
    const medicine = await Medicine.findById(medicineId);
    if (!medicine) return res.status(404).json({ message: 'Medicine not found' });

    const inventory = new Inventory({
      user: req.user._id,
      medicine: medicineId,
      batchNumber,
      quantity,
      expiryDate,
      price,
      minStockLevel,
      location
    });
    await inventory.save();
    res.status(201).json(inventory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateStock = async (req, res) => {
  try {
    const { quantity, price } = req.body;
    const inventory = await Inventory.findOne({ _id: req.params.id, user: req.user._id });
    if (!inventory) return res.status(404).json({ message: 'Not found' });
    if (quantity !== undefined) inventory.quantity = quantity;
    if (price !== undefined) inventory.price = price;
    inventory.lastUpdated = Date.now();
    await inventory.save();
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteBatch = async (req, res) => {
  try {
    const inventory = await Inventory.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!inventory) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};