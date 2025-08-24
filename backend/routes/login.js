import express from "express";
import { login } from "../controllers/loginController.js";

const router = express.Router();

router.post("/", login);

router.get("/", (req, res) => {
  res.send("Login route working (GET request)");
});

export default router;
