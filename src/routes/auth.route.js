import express from "express";

import AuthController from "../controllers/auth.controller.js";
import { validateMdw } from "../middlewares/validation.mdw.js";
import AuthValidator from "../validation/auth.validator.js";
import authMiddleware from "../middlewares/auth.mdw.js";

const router = express.Router();

router.post(
  "/login",
  validateMdw(AuthValidator.loginSchema),
  AuthController.login
);
router.post(
  "/signup",
  validateMdw(AuthValidator.signupSchema),
  AuthController.signup
);
router.get("/current-user", authMiddleware, AuthController.fetchCurrentUser);

export default router;
