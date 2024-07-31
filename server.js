const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./E-commerce/config/database");

dotenv.config({ path: "config.env" });

//create express app
const app = express();

// connect to database
connectDB();

// middleware
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode is ${process.env.NODE_ENV}`);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
