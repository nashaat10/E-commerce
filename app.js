import express from "express";
import morgan from "morgan";
import globalErrorHandler from "./src/Controllers/errorController.js";
import userRoutes from "./src/routes/userRoutes.js";

const app = express();
app.use(express.json());

app.use(morgan("dev"));

app.use("/api/v1/users", userRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`), 404);
});

app.use(globalErrorHandler);

export default app;
