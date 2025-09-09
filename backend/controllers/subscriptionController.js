import SubscriptionPayment from '../models/SubscriptionPayment.js';

// Store a new payment
export const createPayment = async (req, res) => {
  try {
    const { userEmail, amount, paymentMethod, transactionId, status, details } = req.body;
    if (!userEmail || !amount || !paymentMethod) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const payment = new SubscriptionPayment({ userEmail, amount, paymentMethod, transactionId, status, details });
    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all payments for a user
export const getPayments = async (req, res) => {
  try {
    const { userEmail } = req.query;
    const filter = userEmail ? { userEmail } : {};
    const payments = await SubscriptionPayment.find(filter).sort({ paidAt: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
