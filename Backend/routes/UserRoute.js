import express from "express";
import { signup, login, logout, getUserProfile } from "../controller/userController.js";
import SecureToute from "../middleware/SecureToute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getUserProfile", SecureToute, getUserProfile);

export default router;