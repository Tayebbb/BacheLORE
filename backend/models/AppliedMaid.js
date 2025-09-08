import mongoose from 'mongoose';

const AppliedMaidSchema = new mongoose.Schema({
  maidId: { type: mongoose.Schema.Types.ObjectId, ref: 'Maid', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const AppliedMaid = mongoose.models.AppliedMaid || mongoose.model('AppliedMaid', AppliedMaidSchema);

export default AppliedMaid;
