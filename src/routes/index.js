import express from "express";
import postsRouter from "./posts.route.js";
import authRouter from "./auth.route.js";
import uploadImage from "./uploadImage.router.js";
import userRouter from "./user.router.js";
import comment from "./comment.route.js";
import like from "./like.route.js";
import album from "./album.route.js";
import notify from "./notify.route.js";
import pendingNotify from "./pendingNotify.route.js";

const router = express.Router();

router.use("/posts", postsRouter);
router.use("/auth", authRouter);
router.use("/upload", uploadImage);
router.use("/users", userRouter);
router.use("/comment", comment);
router.use("/like", like);
router.use("/album", album);
router.use("/notify", notify);
router.use("/pendingNotify", pendingNotify);

export default router;
