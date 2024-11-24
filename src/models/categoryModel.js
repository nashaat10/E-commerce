import mongoose from "mongoose";
const slugify = require("slugify");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a category name"],
      unique: true,
      trim: true,
    },
    slug: String,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    type: mongoose.Schema.ObjectId,
    products: {
      ref: "Product",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

categorySchema.pre(/^find/, function (next) {
  this.populate({
    path: "products",
  });
  next();
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
