import User from "../models/User.js";
export const signup = async (req, res) => {
  console.log("Received signup data:", req.body);
  try {
  const { fullName, email, password } = req.body;
  console.log('Signup payload received:', { fullName, email });
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });
<<<<<<< Updated upstream
    const newUser = new User({
      fullName,
      email,
      password
    });
  const saved = await newUser.save();
  console.log('User saved:', { id: saved._id, email: saved.email });
  res.status(201).json({ msg: "User registered successfully", user: { id: saved._id, email: saved.email } });
=======
    const newUser = new User({ fullName, email, password });
    await newUser.save();
    console.log("Saved user:", newUser); 
    res.status(201).json({ msg: "User registered successfully" });
>>>>>>> Stashed changes
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ error: err.message });
  }
};