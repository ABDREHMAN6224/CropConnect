import express from "express";
import { getStories, createStory, deleteStory, updateStory, getStory } from "../controllers/StrotyController.js";
import { protect } from "../middlewares/auth.js";
import { upload } from "../utils/upload.js";

const router = express.Router();

router.route("/").get(getStories).post(protect,upload.array("files"),createStory);
router.route("/:id").delete(deleteStory).put(updateStory).get(getStory);

export default router;