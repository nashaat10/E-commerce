import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    minLength: [10, "Name must be at least 10 characters"],
  },
  email: {
    type: String,
    required: [true, "User must have an email"],
    unique: true,
    lowerCase: true,
    validator: [validator.isEmail, "please provide your email"],
  },
  password: {
    type: String,
    required: [true, "Enter your password"],
    min: 4,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password is not the same",
    },
  },
  photo: String,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(userPassword, candidatePassword);
};

const User = mongoose.model("User", userSchema);

export default User;
