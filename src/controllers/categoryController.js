import Category from "../models/categoryModel.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json({
    status: "success",
    result: categories.length,
    data: {
      categories,
    },
  });
});

export const createCategory = catchAsync(async (req, res, next) => {
  const category = await Category.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      category,
    },
  });
});

export const getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new AppError("There is no category with that id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      category,
    },
  });
});

export const updateCategory = catchAsync(async (req, res, next) => {
  const updatedCategory = await Category.findById(req.params.id);

  if (!updatedCategory) {
    return next(new AppError("There is no category with that id", 404));
  }

  updatedCategory.name = req.body.name;

  await updatedCategory.save();

  res.status(200).json({
    status: "success",
    data: {
      updatedCategory,
    },
  });
});

export const deleteCategory = catchAsync(async (req, res, next) => {
  await Category.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    data: null,
  });
});
