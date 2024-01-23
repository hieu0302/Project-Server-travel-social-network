import express from "express";
import ChatRoomController from "../controllers/chatRoom.controller.js";

const router = express();

router.get("/", ChatRoomController.getChatRoom);
router.post("/", ChatRoomController.createChatRoom);
router.delete("/:id", ChatRoomController.deleteChatRoom);

export default router;
