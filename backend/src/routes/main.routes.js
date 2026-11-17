import express from 'express';
import authRoutes from './authRoutes.js';
import medicineRoutes from './medicineRoutes.js';
import inventoryRoutes from './inventoryRoutes.js';
import orderRoutes from './orderRoutes.js';
import chatRoutes from './chatRoutes.js';
import adminRoutes from './adminRoutes.js';



const mainRouter = express.Router();

//routes
mainRouter.use('/api/auth', authRoutes);
mainRouter.use('/api/medicines', medicineRoutes);
mainRouter.use('/api/inventory', inventoryRoutes);
mainRouter.use('/api/orders', orderRoutes);
mainRouter.use('/api/chat', chatRoutes);
mainRouter.use('/api/admin', adminRoutes);


export default mainRouter;