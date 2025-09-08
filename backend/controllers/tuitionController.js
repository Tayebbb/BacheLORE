import Tuition from '../models/Tuition.js';

const ADMIN_CODE = process.env.ADMIN_CODE || 'choton2025';

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
    const adminCode = req.body.adminCode || req.query.adminCode;
    if (adminCode !== ADMIN_CODE) {
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
