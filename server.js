const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

dotenv.config({ path: "./config.env" });

// connect to database
const DB = process.env.DB_URI;

mongoose.connect(DB).then(() => {
  console.log("Database connected successfully");
});
// port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
