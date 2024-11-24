import express from "express";
import * as authController from "../Controllers/authController.js";
import * as productController from "../controllers/productController.js";

const router = express.Router({ mergeParams: true });
router.use(authController.protect);

router
  .route("/")
  .post(productController.createProduct)
  .get(productController.getAllProducts);

router
  .route("/")
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);
export default router;
