import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import User from "../Models/userModel.js";
import { promisify } from "util";
// import crypto from "crypto";
import { token } from "morgan";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_DATE,
  });
};

export const signUp = catchAsync(async (req, res) => {
  const newUser = await User.create(req.body);
  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Incorrect password or email"), 400);
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(user.password, password))) {
    next(new AppError("Incorrect email or password", 400));
  }
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );
  }

  // decoded includes payload data in the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("the token belonging to this user is no longer exist", 401)
    );
  }
  //   if (currentUser.changePasswordAfter(decoded.iat)) {
  //     return next(new AppError("User recently changed password ", 401));
  //   }

  req.user = currentUser;
  next();
});

export const restrictTo = (...roles) => {
  return catchAsync(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("you don't have permission to do this action", 403)
      );
    }
    next();
  });
};
