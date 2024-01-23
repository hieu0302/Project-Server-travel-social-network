import express from "express";
import AlbumController from "../controllers/album.controller.js";
import { validateMdw } from "../middlewares/validation.mdw.js";
import albumValidator from "../validation/album.validtior.js";

const router = express();

router.put("/:id", AlbumController.update);
router.get("/", AlbumController.getAllAlbum);
router.post(
  "/",
  validateMdw(albumValidator.albumSchema),
  AlbumController.createAlbum
);
router.delete("/:id", AlbumController.deleteByID);

export default router;
