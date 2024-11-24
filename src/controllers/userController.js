import express from "express";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import User from "../Models/userModel.js";

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find(req.body);
  res.status(200).json({
    status: "success",
    result: users.length,
    data: {
      users,
    },
  });
});

export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    next(new AppError("There is no user with that id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const updatedUser = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword) {
    next(new AppError("You can't use this route to update your password"));
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.id, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      updatedUser,
    },
  });
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
export const updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new AppError("You can't use this route to update your password")
    );
  }
  const filterBody = filterObj(req.body, "name", "email");
  if (req.file) filterBody.photo = req.file.filename;

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      updatedUser,
    },
  });
});

export const getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});

export const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {
    active: false,
  });
  res.status(204).json({
    status: "success",
    data: null,
  });
});
