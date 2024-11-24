import express from "express";
import morgan from "morgan";
import globalErrorHandler from "./src/Controllers/errorController.js";
import userRoutes from "./src/routes/userRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import productsRoutes from "./src/routes/productRoutes.js";
import AppError from "./src/utils/AppError.js";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/products", productsRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`), 404);
});

app.use(globalErrorHandler);

export default app;
