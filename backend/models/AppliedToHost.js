import mongoose from 'mongoose';

const AppliedToHostSchema = new mongoose.Schema({
  listingRef: { type: mongoose.Schema.Types.ObjectId, ref: 'RoommateListing', required: true },
  applicantRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String },
  email: { type: String },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const AppliedToHost = mongoose.models.AppliedToHost || mongoose.model('AppliedToHost', AppliedToHostSchema);
export default AppliedToHost;
