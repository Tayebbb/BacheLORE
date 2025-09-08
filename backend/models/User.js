import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  university: { type: String, required: true },
  year: { type: String, required: true },
  semester: { type: String, required: true },
  eduEmail: { type: String, required: true },
  roommateCategory: { type: String, enum: ['HostRoommate','SeekerRoommate'], default: 'SeekerRoommate' },
  isAvailableAsHost: { type: Boolean, default: false }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
