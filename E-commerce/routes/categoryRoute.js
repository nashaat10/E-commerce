const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

router
  .route("/")
  .post(categoryController.createCategory)
  .get(categoryController.getAllCategories);

router.route("/:id").delete(categoryController.deleteCategory);

module.exports = router;
