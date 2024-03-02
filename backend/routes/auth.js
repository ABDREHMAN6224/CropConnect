import { getUser, getUsers, login, register, updateUser, uploadAvatar } from '../controllers/auth.js';
import express from 'express';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', getUsers);
router.get('/user/:id', getUser);
router.put('/user/:id', updateUser);
router.put('/user/uploadAvatar/:id', uploadAvatar);
router.delete('/user/:id', deleteUser);



export default router;
