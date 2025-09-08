import mongoose from 'mongoose';

const BookedMaidSchema = new mongoose.Schema({
  maidRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Maid', required: true },
  name: { type: String, required: true },
  hourlyRate: { type: String, required: true },
  location: { type: String },
  contact: { type: String },
  applicantName: { type: String, required: true },
  applicantEmail: { type: String, required: true },
  applicantContact: { type: String, required: true },
  message: { type: String },
  busyUntil: { type: Date, required: true },
  bookedAt: { type: Date, default: Date.now }
});

const BookedMaid = mongoose.models.BookedMaid || mongoose.model('BookedMaid', BookedMaidSchema);

export default BookedMaid;
