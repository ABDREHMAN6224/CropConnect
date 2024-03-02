import express from 'express';
import { isAdmin, protect } from '../middlewares/auth.js';
import { createMarketplace, updateMarketplace, getMarketplace, getMarketplaces, deleteMarketplace, buyMarketplace,  } from '../controllers/marketplace.js';

const router = express.Router();

router.post('/as', protect, createMarketplace);
router.get('/', getMarketplaces);
router.get('/:id', getMarketplace);
router.put('/:id', protect, updateMarketplace);
router.delete('/:id', protect, deleteMarketplace);
router.put('/buy/:id', protect, buyMarketplace);

export default router;