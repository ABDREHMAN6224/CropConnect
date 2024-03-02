import express from 'express';
import { isAdmin, protect } from '../middlewares/auth.js';
import { createMarketplace, updateMarketplace, getMarketplace, getMarketplaces, deleteMarketplace, buyMarketplace,  } from '../controllers/marketplace.js';

const router = express.Router();

router.post('/marketplace', protect, createMarketplace);
router.get('/marketplaces', getMarketplaces);
router.get('/marketplace/:id', getMarketplace);
router.put('/marketplace/:id', protect, updateMarketplace);
router.delete('/marketplace/:id', protect, deleteMarketplace);
router.put('/marketplace/buy/:id', protect, buyMarketplace);

export default router;