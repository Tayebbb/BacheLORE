import express from 'express';
import { getAnnouncements, createAnnouncement } from '../controllers/announcementController.js';

const router = express.Router();

router.get('/', getAnnouncements);
router.post('/', createAnnouncement);

export default router;
