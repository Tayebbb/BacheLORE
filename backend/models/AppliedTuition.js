import mongoose from 'mongoose';

const AppliedTuitionSchema = new mongoose.Schema({
  tuitionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tuition', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const AppliedTuition = mongoose.models.AppliedTuition || mongoose.model('AppliedTuition', AppliedTuitionSchema);

export default AppliedTuition;
