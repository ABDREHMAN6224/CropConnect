import express from 'express';
import { isAdmin, protect } from '../middlewares/auth.js';
import { createMarketplace, updateMarketplace, getMarketplace, getMarketplaces, deleteMarketplace, buyMarketplace, getMyMarketplaces, makeAvailable } from '../controllers/marketplace.js';
import { upload } from '../utils/upload.js';

const router = express.Router();

router.post('/as', protect,upload.array("images",5), createMarketplace);
router.get('/', protect,getMarketplaces);
router.get('/:id', getMarketplace);
router.put('/:id', protect,upload.array("images",5), updateMarketplace);
router.put('/:id/available', protect, makeAvailable);
router.delete('/:id', protect, deleteMarketplace);
router.put('/buy/:id', protect, buyMarketplace);
router.get("/my/marketplace", protect, getMyMarketplaces);

export default router;