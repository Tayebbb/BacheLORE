import express from 'express';
import { listBooked, unbookTuition } from '../controllers/bookedTuitionController.js';

const router = express.Router();

router.get('/', listBooked);
router.post('/:id/unbook', unbookTuition);

export default router;
