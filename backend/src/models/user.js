import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['pharmacy', 'wholesaler', 'admin'], required: true },
  businessName: { type: String, required: true },
  licenseNumber: { type: String },
  efdaLicense: { type: String }, // file path
  isVerified: { type: Boolean, default: false },
  subscription: {
    plan: { type: String, enum: ['free_trial', 'monthly', 'annual'], default: 'free_trial' },
    startDate: Date,
    endDate: Date,
    isActive: { type: Boolean, default: true }
  },
  encryptionSalt: String,
  documents: [{ name: String, url: String, uploadedAt: Date }],
  address: String,
  phone: String,
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidate) {
  return await bcrypt.compare(candidate, this.password);
};

export default mongoose.model('User', userSchema);