import mongoose from 'mongoose';

const AppliedRoommateSchema = new mongoose.Schema({
  userRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String },
  email: { type: String },
  contact: { type: String },
  location: { type: String },
  roomsAvailable: { type: String },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const AppliedRoommate = mongoose.models.AppliedRoommate || mongoose.model('AppliedRoommate', AppliedRoommateSchema);

export default AppliedRoommate;
