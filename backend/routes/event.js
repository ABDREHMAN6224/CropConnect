import express from 'express';
import { isAdmin, protect } from '../middlewares/auth.js';
import { createEvent, deleteEvent, getEvents, registerEvent, updateEvent } from '../controllers/event.js';

const router = express.Router();

router.route('/').get(getEvents).post(protect, isAdmin, createEvent);
router.route('/:id').delete(protect, isAdmin, deleteEvent);
router.route('/:id').put(protect, isAdmin, updateEvent);
router.route('/:id/register').put(protect, registerEvent);

export default router;