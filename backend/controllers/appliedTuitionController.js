import AppliedTuition from '../models/AppliedTuition.js';

export const createApplication = async (req, res) => {
  try {
  const { tuitionId, name, email, contact, message } = req.body;
  if (!tuitionId || !name || !email || !contact) return res.status(400).json({ msg: 'tuitionId, name, email and contact are required' });
  const app = new AppliedTuition({ tuitionId, name, email, contact, message });
    await app.save();
    res.status(201).json({ msg: 'Application submitted', application: app });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const listApplications = async (req, res) => {
  try {
    const list = await AppliedTuition.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteApplication = async (req, res) => {
  try{
    const id = req.params.id;
    await AppliedTuition.findByIdAndDelete(id);
    res.json({ msg: 'Deleted' });
  }catch(err){ res.status(500).json({ error: err.message }); }
}
