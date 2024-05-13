import { contactUs, deleteUser, getAnaytics, getUser, getUsers, login, register, resetPassword, updateUser } from '../controllers/auth.js';
import express from 'express';
import { protect } from '../middlewares/auth.js';
import { upload, uploadImageOnly } from '../utils/upload.js';

import { uploadFile } from '../controllers/uploadFile.js';
import User from '../model/user.js';
import Announcement from '../model/announcement.js';
import Chat from '../model/Chats.js';
import Event from '../model/event.js';
import Feedback from '../model/feedback.js';
import Marketplace from '../model/marketplace.js';
import Message from '../model/messages.js';
import Notification from '../model/Notifications.js';
import Order from '../model/order.js';
import Resource from '../model/resources.js';
import Review from '../model/review.js';
import Story from '../model/stories.js';
import catchAsync from '../utils/catchAsync.js';

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

router.get("/format", catchAsync((req, res) => {
    const Models=[Announcement,Chat,Event,Feedback,Marketplace,Message,Notification,Order,Resource,Review,Story]
    const responses=[]
    User.deleteMany({
        role : {
            $ne: "admin"
        }
    }).then((data) => {
        responses.push({
            success: true,
            message: "Users deleted",
            data: data,
        });
    })
    
    Models.forEach(model => {
        model.deleteMany({}).then((data) => {
            responses.push({
                success: true,
                message: `${model.modelName} deleted`,
                data: data,
            });
        })
    });

    res.json(responses)
}));

export default router;
