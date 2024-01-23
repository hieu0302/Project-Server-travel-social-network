import express from "express";
import MessageController from "../controllers/textChat.controller.js";

const router = express();

router.get("/", MessageController.getMessage);
router.post("/", MessageController.createMessage);
router.delete("/:id", MessageController.deleteMessage);

export default router;
