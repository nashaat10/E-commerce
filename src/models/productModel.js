import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for the  product "],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "product must have a description"],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "product must belong to brand"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a price for the product"],
      min: 0,
    },
    images: [String],

    ratingsAverage: {
      type: Number,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10, // 4.6666 -> 46.666 -> 47 -> 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.index({ price: 1, ratingsAverage: 1 });

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: ("-__v", "-createdAt", "name"),
  });
  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
