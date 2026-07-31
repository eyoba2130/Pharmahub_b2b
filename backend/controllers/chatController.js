import ChatMessage from '../models/ChatMessage.js';

export const getMessages = async (req, res) => {
  try {
    const { orderId } = req.params;
    const query = { $or: [{ sender: req.user._id }, { receiver: req.user._id }] };
    if (orderId) query.order = orderId;
    const messages = await ChatMessage.find(query).populate('sender receiver', 'businessName email');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { receiverId, orderId, message } = req.body;
    const chat = new ChatMessage({
      sender: req.user._id,
      receiver: receiverId,
      order: orderId,
      message
    });
    await chat.save();
    const populated = await ChatMessage.findById(chat._id).populate('sender receiver', 'businessName email');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};