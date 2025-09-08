import express from 'express';
import { createApplication, listApplications, deleteApplication } from '../controllers/appliedTuitionController.js';
import { verifyApplication } from '../controllers/bookedTuitionController.js';

const router = express.Router();

router.post('/', createApplication);
router.get('/', listApplications);
// admin verifies an application -> moves it to booked
router.post('/:id/verify', verifyApplication);
// admin delete application
router.delete('/:id', deleteApplication);

export default router;
