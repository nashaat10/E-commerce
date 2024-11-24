import express from "express";
import * as authController from "../Controllers/authController.js";
import * as productController from "../controllers/productController.js";

const router = express.Router({ mergeParams: true });
router.use(authController.protect);

router
  .route("/")
  .post(authController.restrictTo("admin"), productController.createProduct)
  .get(productController.getAllProducts);

router
  .route("/")
  .get(productController.getProduct)
  .patch(authController.restrictTo("admin"), productController.updateProduct)
  .delete(authController.restrictTo("admin"), productController.deleteProduct);
export default router;
