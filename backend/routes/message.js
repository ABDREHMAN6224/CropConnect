import express from 'express';
import { getMessages, sendMessage } from '../controllers/messageController.js';
import { protect } from '../middlewares/auth.js';
import { upload } from '../utils/upload.js';
const router=express.Router();
router.get('/:chatId',getMessages);
router.post('/sendMessage',protect,upload.single("file"),sendMessage);
export default router;