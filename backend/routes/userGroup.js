import express from 'express';
import { protect } from '../middlewares/auth.js';
import {  accessUserGroup, deleteUserGroup, getuserChats, updateUserGroup } from '../controllers/userGroup.js';

const router = express.Router();

router.route('/').post(protect, accessUserGroup)
router.route('/:id').put(protect, updateUserGroup).delete(protect, deleteUserGroup);
router.route('/chats').get(protect, getuserChats);

export default router;