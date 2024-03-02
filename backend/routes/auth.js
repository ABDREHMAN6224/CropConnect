import { deleteUser, getUser, getUsers, login, register, updateUser, uploadAvatar } from '../controllers/auth.js';
import express from 'express';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users',protect, getUsers);
router.get('/user/:id',protect, getUser);
router.put('/user/:id',protect, updateUser);
router.put('/user/uploadAvatar/:id',protect, uploadAvatar);
router.delete('/user/:id',protect, deleteUser);



export default router;
