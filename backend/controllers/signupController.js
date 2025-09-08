import User from "../models/User.js";
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
  try {
    const { fullName, email, password, university, year, semester, eduEmail, phone } = req.body;
    console.log('Signup payload received:', { fullName, email, university, year, semester, eduEmail });

    // Check all required fields
    if (!fullName || !email || !password || !university || !year || !semester || !eduEmail || !phone) {
      return res.status(400).json({ msg: "All fields are required." });
    }

    // Password strength: min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!strongPassword.test(password)) {
      return res.status(400).json({ msg: "Password must be at least 8 characters and include uppercase, lowercase, number, and special character." });
    }

    // Validate eduEmail (must be .edu or .ac or .edu.bd, etc.)
    const eduEmailPattern = /@(.*\.)?(edu|ac)(\.(bd|com|org|net))?$/i;
    if (!eduEmailPattern.test(eduEmail)) {
      return res.status(400).json({ msg: "Please provide a valid educational email address." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashed,
      university,
      year,
      semester,
      eduEmail,
      phone
    });
    const saved = await newUser.save();
    console.log('User saved:', { id: saved._id, email: saved.email });
    res.status(201).json({ msg: "User registered successfully", user: { id: saved._id, email: saved.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
