import express from "express";
import { getAnnouncements, makeAnnouncement } from "../controllers/announcement.js";
import { isAdmin, protect } from "../middlewares/auth.js";

const router = express.Router();

router.route("/").post(protect,isAdmin,makeAnnouncement).get(getAnnouncements);

export default router;