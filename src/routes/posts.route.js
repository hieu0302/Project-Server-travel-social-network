import express from "express";
import PostsController from "../controllers/posts.controller.js";
import { validateMdw } from "../middlewares/validation.mdw.js";
import postValidator from "../validation/posts.validation.js";

const router = express();

router.get("/", PostsController.getAllPost);
router.post(
  "/",
  validateMdw(postValidator.postSchema),
  PostsController.createPost
);

export default router;
