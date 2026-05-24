import express from "express";
import {
  signup,
  login,
  forgotPassword,
} from "../controllers/authController.js";

const router = express.Router();

// Auth gateways core routing mapping system
router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword); // <-- New dynamic verification path injected

export default router;
