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

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);
router.post("/create", createResource);
router.get("/resources", getResources);
router.get("/resource/:id", getResource);
router.put("/user/:id", updateResource);
router.delete("/user/:id", deleteResource);

export default router;

//
//5000/auth/upload
