import User from "../models/User.js";
import bcrypt from 'bcryptjs';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
  console.log('Login request for:', email);
  const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

  let ok = false;
  const stored = user.password || '';
  console.log('Stored password present:', !!stored, 'looksHashed:', stored.startsWith && stored.startsWith('$2'));
    // If password looks bcrypt-hashed (starts with $2), compare normally.
    if (stored.startsWith('$2')) {
      ok = await bcrypt.compare(password, stored);
    } else {
      // Legacy: stored as plaintext — allow login and migrate to hashed password
      if (password === stored) {
        ok = true;
        try {
          const newHash = await bcrypt.hash(password, 10);
          user.password = newHash;
          await user.save();
          console.log('Migrated plaintext password for user', user.email);
        } catch (mErr) {
          console.warn('Password migration failed for', user.email, mErr.message);
        }
      } else {
        ok = false;
      }
    }
  if (!ok) return res.status(400).json({ msg: "Invalid credentials" });

  console.log('Login successful for:', user.email);

    res.json({
      msg: "Login successful",
  user: { id: user._id, fullName: user.fullName, email: user.email, roommateCategory: user.roommateCategory || 'SeekerRoommate', isAvailableAsHost: !!user.isAvailableAsHost }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};