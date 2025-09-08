import Announcement from '../models/Announcement.js';
import jwt from 'jsonwebtoken';

// Simple admin check: accept JWT or adminCode as fallback
const ADMIN_CODE = process.env.ADMIN_CODE || 'choton2025';
const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret';

export const getAnnouncements = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const [announcements, total] = await Promise.all([
      Announcement.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Announcement.countDocuments()
    ]);
    res.json({ announcements, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createAnnouncement = async (req, res) => {
  try {
    // Allow Authorization: Bearer <token> or adminCode in body/query
    let isAdmin = false;
    const authHeader = req.headers.authorization || '';
    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      try {
        const payload = jwt.verify(token, JWT_SECRET);
        if (payload && payload.role === 'admin') isAdmin = true;
      } catch (err) { /* invalid token */ }
    }
    const adminCode = req.body.adminCode || req.query.adminCode;
    if (!isAdmin && adminCode !== ADMIN_CODE) {
      return res.status(403).json({ msg: 'Forbidden: Admins only' });
    }
    const { title, message } = req.body;
    if (!title || !message) {
      return res.status(400).json({ msg: 'Title and message are required' });
    }
    const announcement = new Announcement({
      title,
      message,
      author: 'admin'
    });
    await announcement.save();
    res.status(201).json({ msg: 'Announcement created', announcement });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
