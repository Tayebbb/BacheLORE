import mongoose from 'mongoose';

const TuitionSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  description: { type: String, required: true },
  contact: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  postedBy: { type: String }, // admin email
});

const Tuition = mongoose.models.Tuition || mongoose.model('Tuition', TuitionSchema);

export default Tuition;
