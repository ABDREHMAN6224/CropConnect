import { deleteUser, getUser, getUsers, login, register, resetPassword, updateUser } from '../controllers/auth.js';
import express from 'express';
import { protect } from '../middlewares/auth.js';
import { upload } from '../utils/upload.js';
import { uploadFile } from '../controllers/uploadFile.js';

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);
router.post('/register',register);
router.post('/login', login);
router.get('/users',protect, getUsers);
router.get('/user/:id',protect, getUser);
router.put('/user/:id',protect, updateUser);
router.delete('/user/:id',protect, deleteUser);
router.post("/user/resetPassword/:id",protect, resetPassword);
router.post("/resetPassword/:resetPasswordToken/:id", resetPassword);


export default router;

// 
//5000/auth/upload