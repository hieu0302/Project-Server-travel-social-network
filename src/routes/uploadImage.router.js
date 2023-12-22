import express from "express";
import UploadImageController from "../controllers/uploadImage.controller.js";
import uploadMdw from "../middlewares/upload.mdw.js";
import authMiddleware from "../middlewares/auth.mdw.js";

const router = express();

router.post(
  "/images",
  authMiddleware,
  uploadMdw.single("image"),
  UploadImageController.uploadImage
);

router.post(
  "/avatar",
  uploadMdw.single("image"),
  UploadImageController.uploadAvatar
);

export default router;
