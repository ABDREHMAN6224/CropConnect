import express from "express";
import { getStories, createStory, deleteStory, updateStory, getStory, approveStory, getPendeingStories, rejectStory } from "../controllers/StrotyController.js";
import { protect } from "../middlewares/auth.js";
import { upload } from "../utils/upload.js";

const router = express.Router();

router.route("/").get(getStories).post(protect,upload.array("files"),createStory);
router.route("/:id").delete(deleteStory).put(updateStory).get(getStory);
router.route("/status/approve/:id").put(protect,approveStory);
router.route("/status/pending").get(getPendeingStories);
router.route("/status/reject/:id").put(protect,rejectStory);

export default router;