import express from 'express';
import { listMaids, createMaid, deleteMaid } from '../controllers/maidController.js';

const router = express.Router();

router.get('/', listMaids);
router.post('/', createMaid);
router.delete('/:id', deleteMaid);

export default router;
