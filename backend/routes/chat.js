import express from 'express';
import { protect } from '../middlewares/auth.js';
import { accessChat, addToGroupChat, createGroupChat, deleteChat, getGroupChats, getUserChats, leaveChat, removeFromGroupChat, updateChat } from '../controllers/chatController.js';

const router = express.Router();

router.route('/create_chat').post(protect, accessChat);
router.route('/:id').put(protect, updateChat).delete(protect, deleteChat);
router.route("/leave/:id").delete(protect, leaveChat);
router.route('/chats').get(protect, getUserChats);
router.route("/group_chats").get(protect,getGroupChats).post(protect,createGroupChat);
router.route("/add/:id").put(protect, addToGroupChat);
router.route("/remove/:id").put(protect, removeFromGroupChat);


export default router;