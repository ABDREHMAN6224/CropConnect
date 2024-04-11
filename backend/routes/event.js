import express from 'express';
import { isAdmin, protect } from '../middlewares/auth.js';
import { createEvent, deleteEvent, getEvents, getPastEvents, getRegisteredEvents, registerEvent, updateEvent } from '../controllers/event.js';
import { upload } from '../utils/upload.js';

const router = express.Router();

router.route('/upcoming').get(protect,getEvents)

router.route('/registered').get(protect, getRegisteredEvents);
router.route('/past').get(protect, getPastEvents);
router.route("/create").post(protect,upload.single("file"), createEvent);
router.route('/register/:id').put(protect, registerEvent);

export default router;