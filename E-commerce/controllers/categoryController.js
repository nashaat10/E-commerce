const category = require("../models/categoryModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
// const catchAsync = require("express-async-handler");

exports.createCategory = catchAsync(async (req, res, next) => {
  const newCategory = await category.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      data: newCategory,
    },
  });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const deleteCategory = await category.findByIdAndDelete(req.params.id);
  if (!deleteCategory) {
    return next(new AppError("No category found with that ID", 404));
  }
  res.json({
    status: 204,
    message: "Category deleted successfully",
    data: null,
  });
});

exports.getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await category.find();
  res.status(200).json({
    status: "success",
    result: categories.length,
    data: {
      data: categories,
    },
  });
});
