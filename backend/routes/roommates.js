import express from 'express';
import { toggleAvailability, listAppliedRoommates, verifyAppliedRoommate, listRoommateListings, applyAsHost, getMyListing, updateMyListing, deleteMyListing, applyToHost, listAppliedToHost } from '../controllers/roommateController.js';

const router = express.Router();

// toggle availability for a user (userId in path)
// legacy toggle kept for backward compatibility (optional)
router.post('/:userId/toggle', toggleAvailability);

// apply as host: create or update your visible listing
router.post('/:userId/apply', applyAsHost);
router.get('/:userId/listing', getMyListing);
router.put('/:userId/listing', updateMyListing);
router.delete('/:userId/listing', deleteMyListing);

// apply to a host listing (seekers)
router.post('/:listingId/apply', applyToHost);

// admin: list applied roommates
router.get('/applied', listAppliedRoommates);
// admin: list applications made to host listings (shows applicant + host/listing)
router.get('/applied-to-host', listAppliedToHost);
// admin: verify application
router.post('/applied/:id/verify', verifyAppliedRoommate);
// admin: delete application
router.delete('/applied/:id', async (req, res) => {
	try{ const id = req.params.id; await import('../controllers/roommateController.js').then(m=>m.deleteAppliedRoommate(req, res)); }
	catch(err){ res.status(500).json({ error: String(err) }); }
});

// public: list roommate listings (seekers only) - requires userId query to check role
router.get('/listings', listRoommateListings);

export default router;
