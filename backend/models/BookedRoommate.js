import mongoose from 'mongoose';

const BookedRoommateSchema = new mongoose.Schema({
  listingRef: { type: mongoose.Schema.Types.ObjectId, ref: 'RoommateListing', required: true },
  hostRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  hostName: { type: String },
  hostEmail: { type: String },
  hostContact: { type: String },
  location: { type: String },
  roomsAvailable: { type: String },
  details: { type: String },
  applicantRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  applicantName: { type: String, required: true },
  applicantEmail: { type: String, required: true },
  applicantContact: { type: String },
  message: { type: String },
  bookedAt: { type: Date, default: Date.now }
});

const BookedRoommate = mongoose.models.BookedRoommate || mongoose.model('BookedRoommate', BookedRoommateSchema);

export default BookedRoommate;