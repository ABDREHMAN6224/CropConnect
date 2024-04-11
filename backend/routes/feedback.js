import express from 'express';
import { createFeedback,getFeedbacks, getMyFeedback } from '../controllers/feedback.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();
router.post('/create',protect,createFeedback);
router.get('/',getFeedbacks);
router.get('/my',protect,getMyFeedback);


export default router;