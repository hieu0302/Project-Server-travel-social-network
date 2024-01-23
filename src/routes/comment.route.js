import express from "express";
import PostsController from "../controllers/posts.controller.js";
import { validateMdw } from "../middlewares/validation.mdw.js";
import CommentController from "../controllers/comment.controller.js";

const router = express();

router.get("/", CommentController.getCommentByID);
router.get("/byPage", CommentController.getCommentByPage);
router.post("/", CommentController.createComment);
router.delete("/:id", CommentController.deleteCmtByID);
router.get("/:id", CommentController.getCommentByIdPost);

export default router;
