import express from "express";
import * as authController from "../Controllers/authController.js";

const router = express.Router();

router.route("/login").post(authController.login);
router.route("/signUp").post(authController.signUp);

router.use(authController.protect);

export default router;
