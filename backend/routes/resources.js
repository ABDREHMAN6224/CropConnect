import {
  createResource,
  getResources,
  getResource,
  updateResource,
  deleteResource,
} from "../controllers/resources.js";
import express from "express";
import { upload } from "../utils/upload.js";
import { uploadFile } from "../controllers/uploadFile.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);
router.get("/all",protect, getResources);
router.post("/create",protect, upload.array("files"),createResource);
router.get("/resource/:id", getResource);
router.put("/user/:id", updateResource);
router.delete("/user/:id", deleteResource);

export default router;

