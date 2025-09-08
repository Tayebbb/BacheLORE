import mongoose from 'mongoose';

const BookedTuitionSchema = new mongoose.Schema({
  tuitionRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Tuition', required: true },
  title: { type: String, required: true },
  subject: { type: String, required: true },
  days: { type: String, required: true },
  salary: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  contact: { type: String, required: true },
  applicantName: { type: String, required: true },
  applicantEmail: { type: String, required: true },
  applicantContact: { type: String, required: true },
  message: { type: String },
  bookedAt: { type: Date, default: Date.now }
});

const BookedTuition = mongoose.models.BookedTuition || mongoose.model('BookedTuition', BookedTuitionSchema);

export default BookedTuition;
