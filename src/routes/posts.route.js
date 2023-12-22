import express from "express";
import PostsController from "../controllers/posts.controller.js";
import { validateMdw } from "../middlewares/validation.mdw.js";
import postValidator from "../validation/posts.validatior.js";
import authMiddleware from "../middlewares/auth.mdw.js";

const router = express();

router.get("/get-paging", PostsController.getPaging)
router.get("/", PostsController.getAllPost);
router.get("/getPostByUserId", authMiddleware,PostsController.getPostByUserId);
router.post(
  "/",
  validateMdw(postValidator.postSchema),
  PostsController.createPost
);
router.delete("/:id", PostsController.deleteByID);

router.get('/saved-posts/:userId', authMiddleware,PostsController.getSavedPosts);
router.put('/:id/save', authMiddleware,PostsController.putSavedPosts)
export default router;
