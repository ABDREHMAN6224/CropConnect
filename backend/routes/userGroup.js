import express from 'express';
import { protect } from '../middlewares/auth.js';
import {  accessUserGroup, deleteUserGroup, getuserChats, leaveChat, updateUserGroup } from '../controllers/userGroup.js';

const router = express.Router();

router.route('/create-chat').get(protect, accessUserGroup);
router.route('/:id').put(protect, updateUserGroup).delete(protect, deleteUserGroup);
router.route("/leave/:id").delete(protect, leaveChat);
router.route('/chats').get(protect ,getuserChats);

export default router;