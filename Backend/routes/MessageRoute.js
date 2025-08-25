import express from "express";
import { sendMessage, getMessages } from "../controller/MessageController.js";
import SecureRoute from "../middleware/SecureRoute.js";

const router = express.Router();

router.post("/send/:id",SecureRoute, sendMessage);
router.get("/get/:id",SecureRoute, getMessages);

export default router;