import Tuition from '../models/Tuition.js';
import jwt from 'jsonwebtoken';

const ADMIN_CODE = process.env.ADMIN_CODE || 'choton2025';
const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret';

export const getTuitions = async (req, res) => {
  try {
    const tuitions = await Tuition.find().sort({ createdAt: -1 });
    res.json(tuitions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createTuition = async (req, res) => {
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
    const { subject, description, contact } = req.body;
    if (!subject || !description || !contact) {
      return res.status(400).json({ msg: 'All fields are required' });
    }
    const tuition = new Tuition({
      subject,
      description,
      contact,
      postedBy: 'admin'
    });
    await tuition.save();
    res.status(201).json({ msg: 'Tuition posted', tuition });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
