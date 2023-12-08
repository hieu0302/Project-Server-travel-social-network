import express from "express";

import AuthController from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/signup", AuthController.signup);
router.get("/current-user", AuthController.fetchCurrentUser);

export default router;
