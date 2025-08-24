import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import signupRoutes from "./routes/signup.js";
import loginRoutes from "./routes/login.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/signup", signupRoutes);
app.use("/api/login", loginRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
