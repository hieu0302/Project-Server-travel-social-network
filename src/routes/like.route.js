import express from "express";
import LikesController from "../controllers/like.controller.js";

const router = express();

router.get("/:id", LikesController.getAllLike);
router.get("/count/:id", LikesController.getCountLike);
router.get("/", LikesController.getAllPostLiked);
router.post("/", LikesController.createLike);
router.delete("/delete/", LikesController.deleteLikeByID);

export default router;
