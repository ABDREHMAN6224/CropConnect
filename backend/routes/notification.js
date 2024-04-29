import express from "express";
import { protect } from "../middlewares/auth.js";
import { CreateNotification, GetNotifications, MarkAsRead } from "../controllers/notification.js";

const router = express.Router();

router.route("/").get(protect,GetNotifications ).post(protect, CreateNotification);
router.route("/:id").delete(protect, MarkAsRead);

export default router;