import app from "./app.js";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./config.env" });

// connect to database
const DB = process.env.DB_URI;

mongoose.connect(DB).then(() => {
  console.log("Database connected successfully");
});
// port
const port = process.env.PORT || 2000;
const server = app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});

// handel unhandledRejection like database connection
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  //server.close() give the server time to finish all the request that are still being handled then the server killed
  server.close(() => {
    process.exit(1);
  });
});
