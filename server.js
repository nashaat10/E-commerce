const express = require("express");
const dotenv = require("dotenv");

const app = require("./app");
const connectDB = require("./E-commerce/config/database");

dotenv.config({ path: "config.env" });

// connect to database
connectDB();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
