import { contactUs, deleteUser, getAnaytics, getUser, getUsers, login, register, resetPassword, updateUser } from '../controllers/auth.js';
import express from 'express';
import { protect } from '../middlewares/auth.js';
import { upload, uploadImageOnly } from '../utils/upload.js';

import { uploadFile } from '../controllers/uploadFile.js';

const router = express.Router();

router.post("/upload",protect, upload.single("file"), uploadFile);
router.post('/register',upload.single("file"),register);
router.post('/login', login);
router.post('/contact', contactUs);
router.get('/users',protect, getUsers);
router.get('/analytics',protect, getAnaytics);
router.get('/user/:id',protect, getUser);
router.put('/user/:id',protect, updateUser);
router.delete('/user/:id',protect, deleteUser);
router.post("/user/resetPassword/:id",protect, resetPassword);
router.post("/resetPassword/:resetPasswordToken/:id", resetPassword);


export default router;

// 
//5000/auth/upload