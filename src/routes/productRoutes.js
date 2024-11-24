import express from "express";
import { protect } from "../Controllers/authController.js";
import {
  createProduct,
  getAllProducts,
} from "../controllers/productController.js";

const router = express.Router({ mergeParams: true });

router.route("/").post(protect, createProduct).get(protect, getAllProducts);

export default router;
