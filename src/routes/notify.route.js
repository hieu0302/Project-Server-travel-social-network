import express from "express";
import NotifyController from "../controllers/notify.controller.js";

const router = express();

router.get("/", NotifyController.getNotify);
router.post("/", NotifyController.createNotify);
router.delete("/:id", NotifyController.deleteNotify);

export default router;
