import Order from '../models/Order.js';
import Inventory from '../models/Inventory.js';

export const createOrder = async (req, res) => {
  try {
    const { wholesalerId, items, deliveryAddress, notes } = req.body;
    let totalAmount = 0;
    const orderItems = [];
    for (const item of items) {
      const inv = await Inventory.findOne({ _id: item.inventoryId, user: wholesalerId });
      if (!inv) return res.status(400).json({ message: `Inventory item not found` });
      if (inv.quantity < item.quantity) return res.status(400).json({ message: 'Insufficient stock' });
      const total = inv.price * item.quantity;
      orderItems.push({
        medicine: inv.medicine,
        batchNumber: inv.batchNumber,
        quantity: item.quantity,
        unitPrice: inv.price,
        total
      });
      totalAmount += total;
    }
    const order = new Order({
      pharmacy: req.user._id,
      wholesaler: wholesalerId,
      items: orderItems,
      totalAmount,
      deliveryAddress,
      notes,
      status: 'pending'
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'pharmacy') query.pharmacy = req.user._id;
    else if (req.user.role === 'wholesaler') query.wholesaler = req.user._id;
    else if (req.user.role === 'admin') { /* no filter */ }
    const orders = await Order.find(query).populate('pharmacy wholesaler items.medicine');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    // only wholesaler or admin can update status
    if (req.user.role === 'wholesaler' && order.wholesaler.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    order.status = status;
    order.updatedAt = Date.now();
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};