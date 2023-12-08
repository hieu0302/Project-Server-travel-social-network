import express from "express";
import postsRouter from "./posts.route.js";
import authRouter from "./auth.route.js";

const router = express.Router();

router.use("/posts", postsRouter);
router.use("/auth", authRouter);

export default router;
