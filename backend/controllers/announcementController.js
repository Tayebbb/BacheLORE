import Announcement from '../models/Announcement.js';

// Simple admin code check (replace with real auth in production)
const ADMIN_CODE = process.env.ADMIN_CODE || 'choton2025';

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
    // Simple admin code check: require adminCode in body or query
    const adminCode = req.body.adminCode || req.query.adminCode;
    if (adminCode !== ADMIN_CODE) {
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
