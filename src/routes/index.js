import express from "express";
import postsRouter from "./posts.route.js";
import authRouter from "./auth.route.js";
import uploadImage from "./uploadImage.router.js";
import userRouter from "./user.router.js";
import comment from "./comment.route.js";
import like from "./like.route.js";
import album from "./album.route.js";

const router = express.Router();

router.use("/posts", postsRouter);
router.use("/auth", authRouter);
router.use("/upload", uploadImage);
router.use("/user", userRouter);
router.use("/comment", comment);
router.use("/like", like);
router.use("/album", album);

export default router;
