import ExpressAsyncHandler from "express-async-handler";
import User from "../model/user.js";

export const uploadFile = async (req, res) => {
  const urlServer = process.env.UPLOAD_PATH;
  if (!req.file) {
    return res.status(404).json({ err: "no file found" });
  }
  const url = `${urlServer}/${req.file.filename}`;
  return res.status(200).json({ url: url });
};
