import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateProfile,
} from "../controllers/users.js";
const router = express.Router();
import { protect } from "../services/authMiddleware.js";

router.post("/", registerUser);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateProfile); // so this is how if you want to add the middleware between route

export default router;
