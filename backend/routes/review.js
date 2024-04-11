import express from 'express';
import { createReview } from '../controllers/review.js';
import { protect } from '../middlewares/auth.js';
const router = express.Router();
router.post('/create',protect,createReview);

export default router;