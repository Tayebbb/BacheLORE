import Maid from '../models/Maid.js';
import AppliedMaid from '../models/AppliedMaid.js';
import BookedMaid from '../models/BookedMaid.js';
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

export const listMaids = async (req, res) => {
  try{
    const list = await Maid.find().sort({ createdAt: -1 });
    res.json(list);
  }catch(err){ res.status(500).json({ error: err.message }); }
};

export const createMaid = async (req, res) => {
  try{
    const isAdmin = await isAdminFromReq(req);
    if(!isAdmin) return res.status(403).json({ msg: 'Forbidden' });
    const { name, hourlyRate, location, description, contact } = req.body;
    if(!name || !hourlyRate) return res.status(400).json({ msg: 'name and hourlyRate required' });
    const maid = new Maid({ name, hourlyRate, location, description, contact });
    await maid.save();
    res.status(201).json({ msg: 'Maid added', maid });
  }catch(err){ res.status(500).json({ error: err.message }); }
};

export const deleteMaid = async (req, res) => {
  try{
    const isAdmin = await isAdminFromReq(req);
    if(!isAdmin) return res.status(403).json({ msg: 'Forbidden' });
    const id = req.params.id;
    await Maid.findByIdAndDelete(id);
    res.json({ msg: 'Deleted' });
  }catch(err){ res.status(500).json({ error: err.message }); }
};

// user creates a booking request
export const createMaidApplication = async (req, res) => {
  try{
    const { maidId, name, email, contact, message } = req.body;
    console.log('createMaidApplication body:', { maidId, name, email, contact });
  if(!maidId || !name || !email || !contact) return res.status(400).json({ msg: 'maidId, name, email and contact required' });
  // ensure maid exists
  const maid = await Maid.findById(maidId);
  if(!maid) return res.status(404).json({ msg: 'Maid not found' });
  const app = new AppliedMaid({ maidId, name, email, contact, message });
    await app.save();
    res.status(201).json({ msg: 'Maid booking request submitted', application: app });
  }catch(err){ res.status(500).json({ error: err.message }); }
};

export const deleteMaidApplication = async (req, res) => {
  try{
    const id = req.params.id;
    await AppliedMaid.findByIdAndDelete(id);
    res.json({ msg: 'Deleted' });
  }catch(err){ res.status(500).json({ error: err.message }); }
}

export const listMaidApplications = async (req, res) => {
  try{
    const list = await AppliedMaid.find().sort({ createdAt: -1 });
    res.json(list);
  }catch(err){ res.status(500).json({ error: err.message }); }
};

// admin verifies application -> moves it to BookedMaid and deletes original Maid and application
export const verifyMaidApplication = async (req, res) => {
  try{
    const isAdmin = await isAdminFromReq(req);
    if(!isAdmin) return res.status(403).json({ msg: 'Forbidden' });
    const appId = req.params.id;
    const app = await AppliedMaid.findById(appId);
    if(!app) return res.status(404).json({ msg: 'Application not found' });
    const maid = await Maid.findById(app.maidId);
    if(!maid) return res.status(404).json({ msg: 'Maid not found' });

    // Create booked record without marking a fixed busy duration
    const booked = new BookedMaid({
      maidRef: maid._id,
      name: maid.name || 'Maid',
      hourlyRate: maid.hourlyRate || 'Negotiable',
      location: maid.location || 'Unknown',
      contact: maid.contact || 'N/A',
      applicantName: app.name || 'Applicant',
      applicantEmail: app.email || 'unknown@example.com',
      applicantContact: app.contact || 'N/A',
      message: app.message || '',
      // busyUntil intentionally left unset
    });
    await booked.save();
    await AppliedMaid.findByIdAndDelete(appId);
    // Do not delete the original Maid entry — keep listing for admin to manage
    res.json({ msg: 'Maid booking verified and marked busy', booked });
  }catch(err){ res.status(500).json({ error: err.message }); }
};

// admin unbook busy maid early -> recreate maid and remove booked record
export const unbookMaid = async (req, res) => {
  try{
    const isAdmin = await isAdminFromReq(req);
    if(!isAdmin) return res.status(403).json({ msg: 'Forbidden' });
    const id = req.params.id;
    const booked = await BookedMaid.findById(id);
    if(!booked) return res.status(404).json({ msg: 'Booked maid not found' });

    const maid = new Maid({
      name: booked.name || 'Maid',
      hourlyRate: booked.hourlyRate || 'Negotiable',
      location: booked.location || '',
      description: '',
      contact: booked.contact || 'N/A'
    });
    await maid.save();
    await BookedMaid.findByIdAndDelete(id);
    res.json({ msg: 'Maid is available again', maid });
  }catch(err){ res.status(500).json({ error: err.message }); }
};

// list busy maids
export const listBookedMaids = async (req, res) => {
  try{
    const list = await BookedMaid.find().sort({ bookedAt: -1 });
    res.json(list);
  }catch(err){ res.status(500).json({ error: err.message }); }
};

// cleanup job: release expired busy maids back into Maid collection
export const releaseExpiredBookedMaids = async (req, res) => {
  try{
    const now = new Date();
    const expired = await BookedMaid.find({ busyUntil: { $lte: now } });
    const recreated = [];
    for(const b of expired){
      const maid = new Maid({
        name: b.name || 'Maid',
        hourlyRate: b.hourlyRate || 'Negotiable',
        location: b.location || '',
        description: '',
        contact: b.contact || 'N/A'
      });
      await maid.save();
      await BookedMaid.findByIdAndDelete(b._id);
      recreated.push(maid);
    }
    res.json({ msg: 'Released expired busy maids', count: recreated.length, recreated });
  }catch(err){ res.status(500).json({ error: err.message }); }
};
