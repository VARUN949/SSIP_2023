const ErrorHandler = require("../utils/errorHandler");
const catcherror = require("./catcherror");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../Model/userModel");

exports.isAuthenticator = catcherror(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("please login to access this service", 401));
  }
  const decodedData = await jwt.verify(token, process.env.JWT_KEY);
  req.user = await User.findById(decodedData.id);
  next();
});

exports.isUserAuthorized = (...roles) => {
  return (req, res, next) => {
    if (req.user) {
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorHandler(`Role ${req.user.role} is not authorized`, 403)
        );
      } else {
        next();
      }
    } else {
      // console.log("user not found");
    }
  };
};
