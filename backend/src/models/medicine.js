import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
  brandName: { type: String, required: true },
  genericName: { type: String, required: true },
  strength: { type: String, required: true },
  category: { type: String, enum: ['antibiotic', 'analgesic', 'antiviral', 'vitamin', 'other'] },
  manufacturerCountry: String,
  // Reference to a central "master" medicine (for standardization)
  masterId: { type: mongoose.Schema.Types.ObjectId, ref: 'MasterMedicine' },
  // Owned by a wholesaler or pharmacy (if they add custom)
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isPublic: { type: Boolean, default: false } // if admin approves as global
});

export default mongoose.model('Medicine', medicineSchema);