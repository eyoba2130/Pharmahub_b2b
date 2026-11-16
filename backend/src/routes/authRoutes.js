// const express = require('express');
// const { register, login, getWholesalers } = require('../controllers/authController.js');
// const authMiddleware = require('../middleware/authMiddleware.js');
// const router = express.Router();

// router.post('/register', register);
// router.post('/login', login);
// router.get('/wholesalers', authMiddleware, getWholesalers);

//  export default router;

import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;