import express from 'express';
import { listBookedMaids, unbookMaid, releaseExpiredBookedMaids } from '../controllers/maidController.js';

const router = express.Router();

router.get('/', listBookedMaids);
router.post('/:id/unbook', unbookMaid);
// admin/manual cleanup or cron trigger to release expired busy maids
router.post('/release-expired', releaseExpiredBookedMaids);

export default router;
