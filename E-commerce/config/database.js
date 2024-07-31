const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.error(`database connection error: ${err}`);
      process.exit(1);
    });
};

module.exports = connectDB;
