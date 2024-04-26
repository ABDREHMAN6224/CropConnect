import express from "express";
import { getStories, createStory, deleteStory, updateStory, getStory, approveStory, getPendeingStories, rejectStory, getMyStories } from "../controllers/StrotyController.js";
import { protect } from "../middlewares/auth.js";
import { upload } from "../utils/upload.js";

const router = express.Router();

router.route("/").get(protect,getStories).post(protect,upload.array("files"),createStory);
router.route("/user/stories/my").get(protect,getMyStories);
router.route("/:id").delete(deleteStory).put(updateStory).get(getStory);
router.route("/status/approve/:id").put(protect,approveStory);
router.route("/status/pending").get(getPendeingStories);
router.route("/status/reject/:id").put(protect,rejectStory);

export default router;