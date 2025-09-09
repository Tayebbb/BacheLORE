import express from 'express';
import { getListings, createListing, buyListing } from '../controllers/marketplaceController.js';

const router = express.Router();

router.get('/', getListings);
router.post('/', createListing);
router.post('/:id/buy', buyListing);

export default router;
