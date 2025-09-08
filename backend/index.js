import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import signupRoutes from "./routes/signup.js";
import loginRoutes from "./routes/login.js";
import announcementRoutes from "./routes/announcements.js";
import tuitionRoutes from "./routes/tuitions.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/signup", signupRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/tuitions", tuitionRoutes);

// Health endpoint to inspect server port and DB connection
app.get('/health', (req, res) => {
  const port = process.env.PORT || 5000;
  const mongoState = mongoose.connection.readyState; // 0=disconnected,1=connected,2=connecting,3=disconnecting
  res.json({ ok: true, port, mongoState });
});

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
