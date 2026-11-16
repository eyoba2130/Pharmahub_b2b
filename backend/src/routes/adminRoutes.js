// import express from 'express';
// // 1. የፋይሉን ስም በትክክል አስተካክለን እና protect/authorizeን import እናድርግ
// import { protect, authorize } from '../middleware/authMiddleware.js';
// import { getUsers, verifyUser, getSystemStats } from '../controllers/adminController.js';

// const router = express.Router();

// // አሁን protect እና authorize እዚህ ጋር በሰላም ይሰራሉ
// router.use(protect, authorize('admin'));

// router.get('/users', getUsers);
// router.put('/verify/:id', verifyUser);
// router.get('/stats', getSystemStats);

// export default router;


import express from 'express';
// 1. protect የነበረውን ወደ authMiddleware እንቀይረዋለን
import { authMiddleware, authorize } from '../middleware/authMiddleware.js';
import { getUsers, verifyUser, getSystemStats } from '../controllers/adminController.js';

const router = express.Router();

// 2. እዚህም ጋር protect የነበረውን ወደ authMiddleware እንቀይረዋለን
router.use(authMiddleware, authorize('admin'));

router.get('/users', getUsers);
router.put('/verify/:id', verifyUser);
router.get('/stats', getSystemStats);

export default router;