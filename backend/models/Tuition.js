import mongoose from 'mongoose';

const TuitionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  days: { type: String, required: true },
  salary: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  contact: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  postedBy: { type: String }, // admin email
});

const Tuition = mongoose.models.Tuition || mongoose.model('Tuition', TuitionSchema);

export default Tuition;
