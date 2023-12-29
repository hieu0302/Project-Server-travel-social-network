import express from "express";
import PostsController from "../controllers/posts.controller.js";
import { validateMdw } from "../middlewares/validation.mdw.js";
import CommentController from "../controllers/comment.controller.js";

const router = express();

router.get("/:id", CommentController.getCommentByIdPost);
router.get("/", CommentController.getCommentByID);
router.post("/", CommentController.createComment);
router.delete("/:id", CommentController.deleteCmtByID);

export default router;
