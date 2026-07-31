import express from 'express';
// 1. require የነበረውን ወደ import ቀይረነዋል
// import { authMiddleware } from '../middleware/authMiddleware.js';
import Medicine from '../models/Medicine.js';

// ማስታወሻ፦ 'authorize' ተግባር ከ authMiddleware.js የሚመጣ ከሆነ እንዲህ አድርገህ import ማድረግ አለብህ፡
import {authMiddleware,  authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// ሁሉንም ቀጣይ መንገዶች በ authMiddleware መጠበቅ
router.use(authMiddleware);

// GET all public medicines
router.get('/', async (req, res) => {
  try {
    const medicines = await Medicine.find({ isPublic: true }).limit(100);
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new medicine
// ⚠️ ልብ በል፦ 'authorize' ከላይ import መደረግ አለበት፣ ካልሆነ 'authorize is not defined' ይልሃል!
router.post('/', authorize('admin'), async (req, res) => {
  try {
    const medicine = new Medicine(req.body);
    await medicine.save();
    res.status(201).json(medicine);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;