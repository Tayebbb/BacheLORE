import BookedTuition from '../models/BookedTuition.js';
import AppliedTuition from '../models/AppliedTuition.js';
import Tuition from '../models/Tuition.js';
import jwt from 'jsonwebtoken';

const ADMIN_CODE = process.env.ADMIN_CODE || 'choton2025';
const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret';

async function isAdminFromReq(req){
  let isAdmin = false;
  const authHeader = req.headers.authorization || '';
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      if (payload && payload.role === 'admin') isAdmin = true;
    } catch (err) { }
  }
  const adminCode = req.body.adminCode || req.query.adminCode;
  if (!isAdmin && adminCode === ADMIN_CODE) isAdmin = true;
  return isAdmin;
}

export const listBooked = async (req, res) => {
  try{
    const list = await BookedTuition.find().sort({ bookedAt: -1 });
    res.json(list);
  }catch(err){ console.error('verifyApplication error', err); res.status(500).json({ error: err.message || String(err) }); }
}

export const verifyApplication = async (req, res) => {
  try{
    const isAdmin = await isAdminFromReq(req);
    if(!isAdmin) return res.status(403).json({ msg: 'Forbidden' });
    const appId = req.params.id;
    const app = await AppliedTuition.findById(appId);
    if(!app) return res.status(404).json({ msg: 'Application not found' });

    const tuition = await Tuition.findById(app.tuitionId);
    if(!tuition) return res.status(404).json({ msg: 'Tuition not found' });

    const booked = new BookedTuition({
      tuitionRef: tuition._id,
      title: tuition.title || tuition.subject || 'Tuition',
      subject: tuition.subject || 'General',
      days: tuition.days || 'To be arranged',
      salary: tuition.salary || 'Negotiable',
      location: tuition.location || 'Unknown',
      description: tuition.description || '',
      contact: tuition.contact || 'N/A',
      applicantName: app.name || 'Applicant',
      applicantEmail: app.email || 'unknown@example.com',
      applicantContact: app.contact || app.phone || 'N/A',
      message: app.message || ''
    });
    await booked.save();
    // remove application and remove tuition from public view by deleting it
    await AppliedTuition.findByIdAndDelete(appId);
    await Tuition.findByIdAndDelete(tuition._id);
    res.json({ msg: 'Application verified and tuition booked', booked });
  }catch(err){ res.status(500).json({ error: err.message }); }
}

export const unbookTuition = async (req, res) => {
  try{
    const isAdmin = await isAdminFromReq(req);
    if(!isAdmin) return res.status(403).json({ msg: 'Forbidden' });
    const id = req.params.id;
    const booked = await BookedTuition.findById(id);
    if(!booked) return res.status(404).json({ msg: 'Booked tuition not found' });

    // recreate tuition record so it becomes visible to users again
    const tuition = new Tuition({
      title: booked.title || booked.subject || 'Tuition',
      subject: booked.subject || 'General',
      days: booked.days || 'To be arranged',
      salary: booked.salary || 'Negotiable',
      location: booked.location || 'Unknown',
      description: booked.description || '',
      contact: booked.contact || 'N/A',
      postedBy: 'admin'
    });
    await tuition.save();
    await BookedTuition.findByIdAndDelete(id);
    res.json({ msg: 'Tuition unbooked and visible again', tuition });
  }catch(err){ res.status(500).json({ error: err.message }); }
}
