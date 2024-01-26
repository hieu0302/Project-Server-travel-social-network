import { ObjectId } from "mongodb";
import { db } from "../../config/database.js";
import asyncHandler from "express-async-handler";
import CloudinaryService from "../services/cloudinary.service.js";

const uploadImage = asyncHandler(async (req, res) => {
  // 1. Get file from request object
  console.log(req.user);
  const file = req.file;
  const user = req.user;
  console.log(file);

  // 2. Upload file from server to Cloudinary
  const { url } = await CloudinaryService.uploadSingleFile(file.path);

  if (!url) {
    res.status(400);
    throw new Error("Upload failed");
  }

  // 3. Update image to mongodb
  await db.images.insertOne({ url, user });

  res.json({
    message: "Upload image successfully",
    userId: user.id,
    url,
  });
});

const uploadAvatar = asyncHandler(async (req, res) => {
  const file = req.file;
  // const user = req.user;

  const { url } = await CloudinaryService.uploadSingleFile(file.path);

  if (!url) {
    res.status(400);
    throw new Error("Upload failed");
  }
  await db.avatar.insertOne({ url });

  res.json({
    message: "Upload avatar successfully",
    // userId: user.id,
    url,
  });
});
const updateAvatar = asyncHandler(async (req, res) => {
  const file = req.file;
  // const user = req.user;
  if (!file) {
    res.status(400);
    throw new Error("No file uploaded");
  }
  const { url } = await CloudinaryService.updateSingleFile(file.path);
  if (!url) {
    res.status(400);
    throw new Error("Upload failed");
  }
  res.json({
    message: "Avatar updated successfully",
    url,
  });
});


const MediaController = {
  uploadImage,
  uploadAvatar,
  updateAvatar,
};

export default MediaController;
