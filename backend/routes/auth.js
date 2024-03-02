import { deleteUser, getUser, getUsers, login, register, resetPassword, updateUser, uploadAvatar } from '../controllers/auth.js';
import express from 'express';
import { isAdmin, protect } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users',protect, getUsers);
router.get('/user/:id',protect, getUser);
router.put('/user/:id',protect, updateUser);
router.put('/user/uploadAvatar/:id',protect, uploadAvatar);
router.delete('/user/:id',protect, deleteUser);
<<<<<<< Updated upstream
router.post("/user/resetPassword/:id",protect, resetPassword);
router.post("/resetPassword/:resetPasswordToken/:id", resetPassword);


export default router;
=======

export default router;
>>>>>>> Stashed changes
