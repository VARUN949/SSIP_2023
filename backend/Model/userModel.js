const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name is too long"],
    minLength: [4, "Name should be at least 4 characters long"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    validate: [validator.isEmail, "Enter a valid email"],
    // unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be at least 8 characters long"],
    validate: {
      validator: function (value) {
        // Check if the password contains at least one alphabetic character, one numeric character, and one special character
        const passwordRegex =
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(value);
      },
      message:
        "Password must contain at least one alphabetic character, one numeric character, and one special character.",
    },
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userModel.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

userModel.methods.JWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_Expire,
  });
};

userModel.methods.ComparePassword = async function (enteredpassword) {
  return await bcrypt.compare(enteredpassword, this.password);
};

userModel.methods.ResetPassword = function () {
  const resettoken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");
  this.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000);
  // console.log(this.resetPasswordExpire);
  return resettoken;
};

module.exports = mongoose.model("User", userModel);
