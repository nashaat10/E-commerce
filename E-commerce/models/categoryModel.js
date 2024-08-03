const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: [true, "Category name must be unique"],
      minLength: [3, "Category name must be at least 3 characters"],
      maxLength: [32, "Category name must be at most 32 characters"],
    },
    slug: {
      type: "string",
      lowercase: true,
    },
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;
