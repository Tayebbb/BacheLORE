import mongoose from 'mongoose';

const SubscriptionPaymentSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  transactionId: { type: String },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  paidAt: { type: Date, default: Date.now },
  details: { type: Object },
});

const SubscriptionPayment = mongoose.models.SubscriptionPayment || mongoose.model('SubscriptionPayment', SubscriptionPaymentSchema);

export default SubscriptionPayment;
