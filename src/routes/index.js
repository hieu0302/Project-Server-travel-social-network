import express from "express";
import postsRouter from "./posts.route.js";
import authRouter from "./auth.route.js";
import uploadImage from "./uploadImage.router.js";
import userRouter from "./user.router.js";

const router = express.Router();

router.use("/posts", postsRouter);
router.use("/auth", authRouter);
router.use("/upload", uploadImage);
router.use("/user", userRouter);

export default router;
