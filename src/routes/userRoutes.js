import express from "express";
import * as authController from "../Controllers/authController.js";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.route("/login").post(authController.login);
router.route("/signUp").post(authController.signUp);

router.use(authController.protect);

router.route("/me").get(userController.getMe, userController.getUser);
router.route("/updateMe").patch(userController.updateMe);
router.route("/deleteMe").patch(userController.deleteMe);

router
  .route("/")
  .get(authController.restrictTo("admin"), userController.getAllUsers);

router
  .route("/:id")
  .get(authController.restrictTo("admin"), userController.getUser);

export default router;
