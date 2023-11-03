// Import required modules and utilities
const ErrorHandler = require("../utils/errorHandler");
const catcherror = require("../Middleware/catcherror");
const User = require("../Model/userModel");
const sendToken = require("../utils/jsontoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// Controller function to register a new user
exports.RegisterUser = catcherror(async (req, res, next) => {
  // Extract user details from the request body
  const { name, email, password } = req.body;

  // Create a new user with default avatar details and send token upon successful registration
  const user = await User.create({
    name,
    email,
    password,
  });
  sendToken(user, 201, res);
});

// Controller function to handle user login
exports.LoginUser = catcherror(async (req, res, next) => {
  // console.log("runn");
  // Extract email and password from the request body
  const { email, password } = req.body;

  // Check if email and password are provided, else return error
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 401));
  }

  // Find user by email and verify password
  const user = await User.findOne({ email }).select("+password");

  // If user not found or password does not match, return error
  if (!user) {
    return next(new ErrorHandler("Enter valid email or password", 401));
  }
  const isPasswordMatched = await user.ComparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Enter valid email or password", 401));
  }

  // Send token upon successful login
  sendToken(user, 200, res);
});

// Controller function to handle user logout
exports.Logout = catcherror(async (req, res, next) => {
  // Clear user token cookie and send success message
  res.cookie("token", null, {
    expires: new Date(),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Controller function to handle user password reset request
exports.forgotPassword = catcherror(async (req, res, next) => {
  // Find user by email provided in the request body
  const user = await User.findOne({ email: req.body.email });

  // If user not found, return error
  if (!user) {
    next(new ErrorHandler("Error: Email not registered", 404));
  }

  // Generate reset token, save it to the user, and send reset email
  const resettoken = user.ResetPassword();
  await user.save({ validateBeforeSave: false });

  // Construct reset URL and message for reset email
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/app/vr1/password/change/${resettoken}`;
  const message = `${resetUrl} please ignore if you have not requested for it.`;

  // Send reset email and respond with success message
  try {
    await sendEmail({
      email: user.email,
      subject: "Message from CivikCrafter :",
      message,
    });
    res.status(200).json({
      success: true,
      message: `email sent to ${user.email}
            ${user.resetPasswordExpire}
            `,
    });
  } catch (error) {
    // If email sending fails, clear user reset details and return error
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// Controller function to handle user password reset
exports.resetPassword = catcherror(async (req, res, next) => {
  // Hash reset token from request parameters
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // Find user by reset token and valid expiration time
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  // If user not found, return error
  if (!user) {
    next(new ErrorHandler("Error: Invalid token or token has expired", 400));
  }

  // Check if new password and confirm password match
  if (req.body.password !== req.body.confirmPassword) {
    next(
      new ErrorHandler(
        "Error: Password and Confirm Password should be same",
        400
      )
    );
  }

  // Update user password, clear reset details, and send token
  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;
  await user.save();
  sendToken(user, 201, res);
});

// Controller function to get user profile
exports.getUserProfile = catcherror(async (req, res, next) => {
  // Find user by ID and respond with user details
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
});

// Controller function to update user password
exports.UpdatePassword = catcherror(async (req, res, next) => {
  // Find user by ID and select password
  const user = await User.findById(req.user.id).select("+password");

  // Check if old password matches
  const isPasswordMatched = await user.ComparePassword(req.body.OldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("old password doesn't match", 400));
  }

  // Check if new password and confirm password match
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("password and confirm password should be same", 400)
    );
  }

  // Update user password and send new token
  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
});

// Controller function to update user profile details
exports.UpdateProfile = catcherror(async (req, res, next) => {
  // Create new user object with updated details
  const newUser = {
    name: req.body.name,
    email: req.body.email,
  };

  // Find user by ID, update details, and send new token
  const user = await User.findByIdAndUpdate(req.user.id, newUser, {
    new: true,
    runValidators: true,
    useFindandModify: false,
  });
  sendToken(user, 200, res);
});

// Controller function to get all users (for admin purposes)
exports.getalluser = catcherror(async (req, res, next) => {
  // Find all users and respond with user details
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

exports.adminLogin = catcherror(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  // Find admin by email
  const admin = await User.findOne({ email }).select("+password");

  // If admin not found, return error
  if (!admin || admin.role !== "admin") {
    return next(new ErrorHandler("Only for Admins", 401));
  }

  // Verify password
  const isPasswordMatched = await admin.ComparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // Send token upon successful admin login
  sendToken(admin, 200, res);
});

// Controller function to get a single user by ID (for admin purposes)
exports.getSinglealluser = catcherror(async (req, res, next) => {
  // Find user by ID and respond with user details
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("user not found", 400));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

// Controller function to update user role (for admin purposes)
exports.UpdateRole = catcherror(async (req, res, next) => {
  // Create new user object with updated details including role
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  // Find user by ID, update details, and send new token
  const user = await User.findByIdAndUpdate(req.params.id, newUser, {
    new: true,
    runValidators: true,
    useFindandModify: false,
  });

  // If user not found, return error
  if (!user) {
    return next(new ErrorHandler("user not found", 401));
  }

  // Send new token
  sendToken(user, 200, res);
});

// Controller function to delete a user (for admin purposes)
exports.DeleteUser = catcherror(async (req, res, next) => {
  // Find user by ID and delete
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("user not found", 401));
  }
  await user.deleteOne();

  // Respond with success message
  res.status(200).json({
    success: true,
    message: "user deleted successfully",
  });
});
