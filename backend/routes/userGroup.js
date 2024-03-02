import express from 'express';
import { isAdmin, protect } from '../middlewares/auth.js';
import { createUserGroup, deleteUserGroup, getUserGroups, updateUserGroup } from '../controllers/userGroup.js';

const router = express.Router();

router.route('/').post(protect, createUserGroup).get(protect, getUserGroups);
router.route('/:id').put(protect, updateUserGroup).delete(protect, deleteUserGroup);

export default router;