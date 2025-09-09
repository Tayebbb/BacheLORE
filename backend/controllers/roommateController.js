import User from '../models/User.js';
import AppliedRoommate from '../models/AppliedRoommate.js';
import RoommateListing from '../models/RoommateListing.js';
import AppliedToHost from '../models/AppliedToHost.js';
import BookedRoommate from '../models/BookedRoommate.js';
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

// create an application to a host listing (stores in AppliedRoommate collection)
export const createAppliedRoommate = async (req, res) => {
  try{
    const { listingId, applicantId, name, email, contact, message } = req.body;
    // try to resolve applicant when provided
    let userRef = null;
    if(applicantId){ try{ const u = await User.findById(applicantId); if(u) userRef = u._id; }catch(e){} }
    // try to get listing location/name if listingId provided
    let listingInfo = {};
    if(listingId){ try{ const l = await RoommateListing.findById(listingId); if(l){ listingInfo.location = l.location || ''; listingInfo.name = l.name || ''; } }catch(e){} }
    const app = new AppliedRoommate({ userRef, name: name || '', email: email || '', contact: contact || '', location: listingInfo.location || '', roomsAvailable: listingInfo.roomsAvailable || '', message: message || '' });
    await app.save();
    res.status(201).json({ msg: 'Application submitted', application: app });
  }catch(err){ res.status(500).json({ error: err.message }); }
}

export const verifyAppliedRoommate = async (req, res) => {
  try{
    const isAdmin = await isAdminFromReq(req);
    if(!isAdmin) return res.status(403).json({ msg: 'Forbidden' });
    const id = req.params.id;
    const app = await AppliedRoommate.findById(id);
    if(!app) return res.status(404).json({ msg: 'Application not found' });
    // try to resolve a linked user if present; otherwise proceed without user
    let user = null;
    if(app.userRef){ try{ user = await User.findById(app.userRef); }catch(e){ user = null; } }
    // create listing; if we have a user use their id and defaults
    const listing = new RoommateListing({ userRef: user ? user._id : undefined, name: app.name || (user ? user.fullName : '') || '', email: app.email || (user ? user.email : '') || '', contact: app.contact || (user ? user.phone : '') || '', location: app.location || '', roomsAvailable: app.roomsAvailable || '', details: app.message || '' });
    await listing.save();
    // if we have a user, mark as host available
    if(user){ user.roommateCategory = 'HostRoommate'; user.isAvailableAsHost = true; await user.save(); }
    // create a booked roommate entry so it appears in the booked section
    try{
      const booked = new BookedRoommate({
        listingRef: listing._id,
        hostRef: user ? user._id : undefined,
        hostName: listing.name || (user && user.fullName) || '',
        hostEmail: listing.email || (user && user.email) || '',
        hostContact: listing.contact || '',
        location: listing.location || '',
        roomsAvailable: listing.roomsAvailable || '',
        details: listing.details || '',
        applicantRef: app.userRef || undefined,
        applicantName: app.name || '',
        applicantEmail: app.email || '',
        applicantContact: app.contact || '',
        message: app.message || ''
      });
      await booked.save();
      // remove application
      await AppliedRoommate.findByIdAndDelete(id);
      res.json({ msg: 'Verified, listed and booked', listing, booked });
    }catch(e){
      // if booked creation fails, still remove application and return listing
      await AppliedRoommate.findByIdAndDelete(id);
      res.json({ msg: 'Verified and listed (book creation failed)', listing });
    }
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
  // Return all roommate listings. Previously this endpoint required a userId and
  // blocked hosts from viewing listings; that prevented admin-posted listings
  // from being visible in some cases. Make listings public to clients.
  const list = await RoommateListing.find().sort({ createdAt: -1 });
  res.json(list);
  }catch(err){ res.status(500).json({ error: err.message }); }
}

  // admin: create a roommate listing directly (ties to an existing user ownerId)
  export const adminCreateListing = async (req, res) => {
    try{
      const isAdmin = await isAdminFromReq(req);
      if(!isAdmin) return res.status(403).json({ msg: 'Forbidden' });
      const { ownerId, name, email, contact, location, roomsAvailable, details } = req.body;
      let user = null;
      let userRef = null;
      // attempt to resolve ownerId safely: accept ObjectId string or an email
      if(ownerId){
        try{
          // if valid ObjectId, try finding by id
          if(ownerId && ownerId.match && ownerId.match(/^[0-9a-fA-F]{24}$/)){
            user = await User.findById(ownerId);
            if(user) userRef = user._id;
          } else if(ownerId && ownerId.includes('@')){
            // maybe an email
            user = await User.findOne({ email: ownerId });
            if(user) userRef = user._id;
          }
        }catch(e){ /* ignore resolution errors */ }
      }
      // create listing; if we found a user use their fields as defaults
      const listing = new RoommateListing({ userRef: userRef, name: name || (user ? user.fullName : '') || '', email: email || (user ? user.email : '') || '', contact: contact || (user ? user.phone : '') || '', location: location || '', roomsAvailable: roomsAvailable || '', details: details || '' });
      await listing.save();
      // mark owner as host and available
      if(user){ user.roommateCategory = 'HostRoommate'; user.isAvailableAsHost = true; await user.save(); }
      res.status(201).json({ msg: 'Listing created', listing });
    }catch(err){ res.status(500).json({ error: err.message }); }
  }


export const applyAsHost = async (req, res) => {
  try{
    const userId = req.params.userId;
    const { name, email, contact, location, roomsAvailable, details } = req.body;
    const user = await User.findById(userId);
    if(!user) return res.status(404).json({ msg: 'User not found' });
  
    let listing = await RoommateListing.findOne({ userRef: user._id });
    if(listing){
    
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
  
    let applicantRef = null;
    let applicantName = name || '';
    let applicantEmail = email || '';
    if(applicantId){
      const user = await User.findById(applicantId).select('fullName email');
      if(user){ applicantRef = user._id; applicantName = applicantName || user.fullName || ''; applicantEmail = applicantEmail || user.email || ''; }
    }
    const app = new AppliedToHost({ listingRef: listing._id, applicantRef, name: applicantName, email: applicantEmail, message: message || '' });
    await app.save();

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


export const verifyAppliedToHost = async (req, res) => {
  try{
    const isAdmin = await isAdminFromReq(req);
    if(!isAdmin) return res.status(403).json({ msg: 'Forbidden' });
    const id = req.params.id;
    const app = await AppliedToHost.findById(id).populate({ path: 'listingRef', populate: { path: 'userRef', select: 'fullName email phone' } });
    if(!app) return res.status(404).json({ msg: 'Application not found' });
    const listing = app.listingRef;
    if(!listing) return res.status(404).json({ msg: 'Listing not found' });
 
    const booked = new BookedRoommate({
      listingRef: listing._id,
      hostRef: listing.userRef || null,
      hostName: listing.name || (listing.userRef && listing.userRef.fullName) || '',
      hostEmail: listing.email || (listing.userRef && listing.userRef.email) || '',
      hostContact: listing.contact || '',
      location: listing.location || '',
      roomsAvailable: listing.roomsAvailable || '',
      details: listing.details || '',
      applicantRef: app.applicantRef || null,
      applicantName: app.name || (app.applicantRef && app.applicantRef.fullName) || '',
      applicantEmail: app.email || (app.applicantRef && app.applicantRef.email) || '',
      message: app.message || ''
    });
    await booked.save();
   
    await AppliedToHost.findByIdAndDelete(id);
    res.json({ msg: 'Application verified and roommate booked', booked });
  }catch(err){ res.status(500).json({ error: err.message }); }
}


export const listBookedRoommates = async (req, res) => {
  try{
    const isAdmin = await isAdminFromReq(req);
    if(!isAdmin) return res.status(403).json({ msg: 'Forbidden' });
    const list = await BookedRoommate.find().sort({ bookedAt: -1 })
      .populate('listingRef')
      .populate('hostRef', 'fullName email')
      .populate('applicantRef', 'fullName email');
    res.json(list);
  }catch(err){ res.status(500).json({ error: err.message }); }
}


export const unbookRoommate = async (req, res) => {
  try{
    const isAdmin = await isAdminFromReq(req);
    if(!isAdmin) return res.status(403).json({ msg: 'Forbidden' });
    const id = req.params.id;
    await BookedRoommate.findByIdAndDelete(id);
    res.json({ msg: 'Unbooked' });
  }catch(err){ res.status(500).json({ error: err.message }); }
}