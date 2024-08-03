const express = require("express");
const morgan = require("morgan");
const AppError = require("./E-commerce/utils/appError");
const globalErrorHandler = require("./E-commerce/controllers/errorController");
const categoryRouter = require("./E-commerce/routes/categoryRoute");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode is ${process.env.NODE_ENV}`);
}

// middleware
app.use(express.json());

// Route
app.use("/api/v1/category", categoryRouter);
// all is used to handle all http requests and responses from the server
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
