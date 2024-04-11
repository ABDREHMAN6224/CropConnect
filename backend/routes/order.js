import express from 'express';
import { protect } from '../middlewares/auth.js';

import { createOrder, getMyOrders, getStoreOrders, getOrder, updateOrder } from '../controllers/order.js';

const router = express.Router();

router.post('/create', protect, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/storeorders', protect, getStoreOrders);
router.get('/:id', protect, getOrder);
router.put('/:id', protect, updateOrder);

export default router;