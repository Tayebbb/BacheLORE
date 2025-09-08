import mongoose from 'mongoose';

const MaidSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hourlyRate: { type: String, required: true },
  location: { type: String },
  description: { type: String },
  contact: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Maid = mongoose.models.Maid || mongoose.model('Maid', MaidSchema);

export default Maid;
