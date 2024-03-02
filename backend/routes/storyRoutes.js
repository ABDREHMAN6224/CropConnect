import express from "express";
import { getStories, createStory, deleteStory, updateStory } from "../controllers/StrotyController.js";

const router = express.Router();

router.route("/").get(getStories).post(createStory);
router.route("/:id").delete(deleteStory).put(updateStory);

export default router;