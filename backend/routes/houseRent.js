import express from 'express';
import { createListing, listListings, adminListUnverified, verifyListing, createContact, listContactsForUser } from '../controllers/houseRentController.js';

const router = express.Router();

router.post('/create', createListing);
router.get('/', listListings);
// admin
router.get('/admin/unverified', adminListUnverified);
router.post('/admin/:id/verify', verifyListing);
router.delete('/admin/:id', async (req, res) => {
	try{ const id = req.params.id; await import('../controllers/houseRentController.js').then(m=>m.deleteListing(req, res)); }
	catch(err){ res.status(500).json({ error: String(err) }); }
});

// contacts
router.post('/contact', createContact);
router.get('/contacts/:userId', listContactsForUser);

export default router;
