import express from "express";
import * as authController from "../Controllers/authController.js";
import * as categoryController from "../controllers/categoryController.js";

const router = express.Router();

router.use(authController.protect);
router
  .route("/")
  .post(authController.restrictTo("admin"), categoryController.createCategory)
  .get(categoryController.getAllCategories);
router
  .route("/:id")
  .get(categoryController.getCategory)
  .patch(authController.restrictTo("admin"), categoryController.updateCategory)
  .delete(
    authController.restrictTo("admin"),
    categoryController.deleteCategory
  );

export default router;
