import express from 'express';
import { createMaidApplication, listMaidApplications, } from '../controllers/maidController.js';
import { verifyMaidApplication } from '../controllers/maidController.js';

const router = express.Router();

router.post('/', createMaidApplication);
router.get('/', listMaidApplications);
// admin verify booking
router.post('/:id/verify', verifyMaidApplication);
// admin delete application
router.delete('/:id', async (req, res) => {
	// delegate to controller
	try{ const id = req.params.id; await import('../controllers/maidController.js').then(m=>m.deleteMaidApplication(req, res)); }
	catch(err){ res.status(500).json({ error: String(err) }); }
});

export default router;
