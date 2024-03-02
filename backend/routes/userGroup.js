import express from 'express';
import { protect } from '../middlewares/auth.js';
import {  deleteUserGroup, getUserGroups, getuserChats, updateUserGroup } from '../controllers/userGroup.js';
import { accessChat } from '../controllers/messageController.js';

const router = express.Router();

router.route('/').post(protect, accessChat).get(protect, getUserGroups);
router.route('/:id').put(protect, updateUserGroup).delete(protect, deleteUserGroup);
router.route('/chats').get(protect, getuserChats);

export default router;