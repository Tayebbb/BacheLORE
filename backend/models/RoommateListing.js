import mongoose from 'mongoose';

const RoommateListingSchema = new mongoose.Schema({
  userRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String },
  contact: { type: String },
  location: { type: String },
  roomsAvailable: { type: String },
  details: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const RoommateListing = mongoose.models.RoommateListing || mongoose.model('RoommateListing', RoommateListingSchema);

export default RoommateListing;
