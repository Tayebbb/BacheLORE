import express from 'express';
import { getUserActivity } from '../controllers/activityController.js';

const router = express.Router();

// GET /api/activity/:userEmail
router.get('/:userEmail', getUserActivity);

export default router;
