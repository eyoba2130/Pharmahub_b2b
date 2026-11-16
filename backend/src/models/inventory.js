import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
  batchNumber: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 },
  expiryDate: { type: Date, required: true },
  price: { type: Number, required: true }, // selling price per unit
  minStockLevel: { type: Number, default: 10 },
  location: String, // warehouse section
  lastUpdated: { type: Date, default: Date.now }
});

// Compound index to ensure uniqueness per user+medicine+batch
inventorySchema.index({ user: 1, medicine: 1, batchNumber: 1 }, { unique: true });

export default mongoose.model('Inventory', inventorySchema);