import express from 'express';
import { getMessages, sendMessage } from '../controllers/chatController.js'; 

const router = express.Router();

// ከ '?:orderId' ይልቅ እነዚህን ሁለት መስመሮች መጠቀም ስህተቱን ያስወግደዋል፡
router.get('/', getMessages);             // ለ /api/chats (ያለ orderId ለመጠየቅ)
router.get('/:orderId', getMessages);      // ለ /api/chats/123 (ከነ orderId ለመጠየቅ)

router.post('/', sendMessage);

export default router;