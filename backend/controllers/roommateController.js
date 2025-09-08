import User from '../models/User.js';
import AppliedRoommate from '../models/AppliedRoommate.js';
import RoommateListing from '../models/RoommateListing.js';
import AppliedToHost from '../models/AppliedToHost.js';
import jwt from 'jsonwebtoken';

const ADMIN_CODE = process.env.ADMIN_CODE || 'choton2025';
const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret';

async function isAdminFromReq(req){
  let isAdmin = false;
  const authHeader = req.headers.authorization || '';
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    try { const payload = jwt.verify(token, JWT_SECRET); if (payload && payload.role === 'admin') isAdmin = true; } catch (err) {}
  }
  const adminCode = req.body.adminCode || req.query.adminCode;
  if (!isAdmin && adminCode === ADMIN_CODE) isAdmin = true;
  return isAdmin;
}

export const toggleAvailability = async (req, res) => {
  try{
    const userId = req.params.userId;
    const { isAvailable, location, roomsAvailable, details } = req.body;
    const user = await User.findById(userId);
    if(!user) return res.status(404).json({ msg: 'User not found' });
    user.isAvailableAsHost = !!isAvailable;
    // if marking available, set category and create applied roommate
    if(isAvailable){
      user.roommateCategory = 'HostRoommate';
      await user.save();
      // create appliedRoommate entry
      const ar = new AppliedRoommate({ userRef: user._id, name: user.fullName || '', email: user.email || '', contact: user.phone || '', location: location || '', roomsAvailable: roomsAvailable || '', message: details || '' });
      await ar.save();
      return res.json({ msg: 'Marked available. Application submitted', applied: ar });
    } else {
      // turning off availability: set isAvailable false and remove any listing
      user.isAvailableAsHost = false;
      await user.save();
      // remove any existing listing
      await RoommateListing.findOneAndDelete({ userRef: user._id });
      return res.json({ msg: 'Availability removed' });
    }
  }catch(err){ res.status(500).json({ error: err.message }); }
};

export const listAppliedRoommates = async (req, res) => {
  try{ const list = await AppliedRoommate.find().sort({ createdAt: -1 }); res.json(list); } catch(err){ res.status(500).json({ error: err.message }); }
}

export const verifyAppliedRoommate = async (req, res) => {
  try{
    const isAdmin = await isAdminFromReq(req);
    if(!isAdmin) return res.status(403).json({ msg: 'Forbidden' });
    const id = req.params.id;
    const app = await AppliedRoommate.findById(id);
    if(!app) return res.status(404).json({ msg: 'Application not found' });
    const user = await User.findById(app.userRef);
    if(!user) return res.status(404).json({ msg: 'User not found' });
    // create listing
    const listing = new RoommateListing({ userRef: user._id, name: app.name || user.fullName || '', email: app.email || user.email || '', contact: app.contact || user.phone || '', location: app.location || '', roomsAvailable: app.roomsAvailable || '', details: app.message || '' });
    await listing.save();
    // remove application
    await AppliedRoommate.findByIdAndDelete(id);
    // ensure user flagged as Host
    user.roommateCategory = 'HostRoommate';
    user.isAvailableAsHost = true;
    await user.save();
    res.json({ msg: 'Verified and listed', listing });
  }catch(err){ res.status(500).json({ error: err.message }); }
}

export const deleteAppliedRoommate = async (req, res) => {
  try{
    const isAdmin = await isAdminFromReq(req);
    if(!isAdmin) return res.status(403).json({ msg: 'Forbidden' });
    const id = req.params.id;
    await AppliedRoommate.findByIdAndDelete(id);
    res.json({ msg: 'Deleted' });
  }catch(err){ res.status(500).json({ error: err.message }); }
}

export const listRoommateListings = async (req, res) => {
  try{
    // only return listings to seekers
    const userId = req.query.userId;
    if(!userId) return res.status(400).json({ msg: 'userId query required to filter by role' });
    const user = await User.findById(userId);
    if(!user) return res.status(404).json({ msg: 'User not found' });
    if(user.roommateCategory === 'HostRoommate') return res.status(403).json({ msg: 'Hosts cannot view listings' });
    const list = await RoommateListing.find().sort({ createdAt: -1 });
    res.json(list);
  }catch(err){ res.status(500).json({ error: err.message }); }
}

// create or update listing for a user (apply as host) - visible immediately
export const applyAsHost = async (req, res) => {
  try{
    const userId = req.params.userId;
    const { name, email, contact, location, roomsAvailable, details } = req.body;
    const user = await User.findById(userId);
    if(!user) return res.status(404).json({ msg: 'User not found' });
    // find existing listing
    let listing = await RoommateListing.findOne({ userRef: user._id });
    if(listing){
      // update
      listing.name = name || listing.name || user.fullName || '';
      listing.email = email || listing.email || user.email || '';
      listing.contact = contact || listing.contact || user.phone || '';
      listing.location = location || listing.location || '';
      listing.roomsAvailable = roomsAvailable || listing.roomsAvailable || '';
      listing.details = details || listing.details || '';
      await listing.save();
    } else {
      listing = new RoommateListing({ userRef: user._id, name: name || user.fullName || '', email: email || user.email || '', contact: contact || user.phone || '', location: location || '', roomsAvailable: roomsAvailable || '', details: details || '' });
      await listing.save();
    }
    // mark user as host and available
    user.roommateCategory = 'HostRoommate';
    user.isAvailableAsHost = true;
    await user.save();
    res.status(201).json({ msg: 'Listed as host', listing });
  }catch(err){ res.status(500).json({ error: err.message }); }
}

export const getMyListing = async (req, res) => {
  try{
    const userId = req.params.userId;
    const listing = await RoommateListing.findOne({ userRef: userId });
    if(!listing) return res.status(404).json({ msg: 'Listing not found' });
    res.json(listing);
  }catch(err){ res.status(500).json({ error: err.message }); }
}

export const updateMyListing = async (req, res) => {
  try{
    const userId = req.params.userId;
    const { name, email, contact, location, roomsAvailable, details } = req.body;
    let listing = await RoommateListing.findOne({ userRef: userId });
    if(!listing) return res.status(404).json({ msg: 'Listing not found' });
    listing.name = name || listing.name;
    listing.email = email || listing.email;
    listing.contact = contact || listing.contact;
    listing.location = location || listing.location;
    listing.roomsAvailable = roomsAvailable || listing.roomsAvailable;
    listing.details = details || listing.details;
    await listing.save();
    res.json({ msg: 'Updated', listing });
  }catch(err){ res.status(500).json({ error: err.message }); }
}

export const deleteMyListing = async (req, res) => {
  try{
    const userId = req.params.userId;
    await RoommateListing.findOneAndDelete({ userRef: userId });
    // also update user flag
    const user = await User.findById(userId);
    if(user){ user.isAvailableAsHost = false; user.roommateCategory = user.roommateCategory === 'HostRoommate' ? '' : user.roommateCategory; await user.save(); }
    res.json({ msg: 'Removed listing' });
  }catch(err){ res.status(500).json({ error: err.message }); }
}

export const applyToHost = async (req, res) => {
  try{
    const listingId = req.params.listingId;
    const { applicantId, name, email, message } = req.body;
    const listing = await RoommateListing.findById(listingId);
    if(!listing) return res.status(404).json({ msg: 'Listing not found' });
    // try to resolve applicant user when provided
    let applicantRef = null;
    let applicantName = name || '';
    let applicantEmail = email || '';
    if(applicantId){
      const user = await User.findById(applicantId).select('fullName email');
      if(user){ applicantRef = user._id; applicantName = applicantName || user.fullName || ''; applicantEmail = applicantEmail || user.email || ''; }
    }
    const app = new AppliedToHost({ listingRef: listing._id, applicantRef, name: applicantName, email: applicantEmail, message: message || '' });
    await app.save();
    // return populated application for convenience
    const populated = await AppliedToHost.findById(app._id)
      .populate('applicantRef', 'fullName email')
      .populate({ path: 'listingRef', populate: { path: 'userRef', model: 'User', select: 'fullName email' } });
    res.status(201).json({ msg: 'Application submitted', application: populated });
  }catch(err){ res.status(500).json({ error: err.message }); }
}

export const listAppliedToHost = async (req, res) => {
  try{
    const isAdmin = await isAdminFromReq(req);
    if(!isAdmin) return res.status(403).json({ msg: 'Forbidden' });
    const list = await AppliedToHost.find().sort({ createdAt: -1 })
      .populate('applicantRef', 'fullName email')
      .populate({ path: 'listingRef', populate: { path: 'userRef', select: 'fullName email' } });
    res.json(list);
  }catch(err){ res.status(500).json({ error: err.message }); }
}
