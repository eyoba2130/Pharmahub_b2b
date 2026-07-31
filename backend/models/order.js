import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  pharmacy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  wholesaler: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
    batchNumber: String,
    quantity: Number,
    unitPrice: Number,
    total: Number
  }],
  totalAmount: Number,
  status: {
    type: String,
    enum: ['pending', 'accepted', 'preparing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid', 'failed'],
    default: 'unpaid'
  },
  paymentMethod: { type: String, enum: ['telebirr', 'cbe', 'chapa'] },
  transactionId: String,
  proformaInvoice: String, // URL to PDF
  deliveryAddress: String,
  notes: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', orderSchema);