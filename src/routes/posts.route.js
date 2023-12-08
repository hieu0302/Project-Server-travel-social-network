import express from "express";
import PostsController from "../controllers/posts.controller.js";
import { validateMdw } from "../middlewares/validation.mdw.js";
import postValidator from "../validation/posts.validation.js";

const router = express();

router.get("/get-paging", PostsController.getPaging)
router.get("/", PostsController.getAllPost);
router.post(
  "/",
  validateMdw(postValidator.postSchema),
  PostsController.createPost
);

router.get("/published-posts", PostsController.getPublishedPosts);
router.get('/saved-posts',PostsController.getSavedPosts);
export default router;
