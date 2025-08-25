import express from "express";
import { signup, login, logout, getUserProfile, getAvailableUsers } from "../controller/userController.js";
import SecureRoute from "../middleware/SecureRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getUserProfile", SecureRoute, getUserProfile);
router.get("/getAvailableUsers", SecureRoute, getAvailableUsers);

export default router;