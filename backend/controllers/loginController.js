import User from "../models/User.js";
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });
    if (user.password !== password) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    res.json({
      msg: "Login successful",
      user: { id: user._id, fullName: user.fullName, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
