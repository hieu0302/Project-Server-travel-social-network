import express from "express";
import PendingNotifyController from "../controllers/pendingNotify.controller.js";

const router = express();

router.delete(
  "/delete-id-room/:id",
  PendingNotifyController.deleteNotifyByIdRoomChat
);
router.post("/", PendingNotifyController.createPendingNotify);
router.get("/:id", PendingNotifyController.getNotifyByUserId);
router.delete("/:id", PendingNotifyController.deletePendingNotify);

export default router;
