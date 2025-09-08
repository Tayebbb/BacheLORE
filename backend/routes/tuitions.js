import express from 'express';
import { getTuitions, createTuition } from '../controllers/tuitionController.js';

const router = express.Router();

router.get('/', getTuitions);
router.post('/', createTuition);

export default router;
