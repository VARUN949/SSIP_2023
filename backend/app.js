// Import required modules
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const placeRoutes = require("./Routes/routePlace");
const userRoutes = require("./Routes/userRoute");
const errorMiddleware = require("./Middleware/errors");

// Initialize Express app
const app = express();
console.log(process.env.PORT)
// Middleware - Body parser for JSON data and Cookie parser
app.use(express.json());
app.use(cookieParser());

// Middleware - CORS
app.use(cors());

// Connect to MongoDB database
mongoose
  .connect(
    "mongodb+srv://bavadiyadhruv:cf8YtIjKGoBNXPaA@cluster1.zvsodkn.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Mongoose is connected");
  })
  .catch((err) => {
    console.error("Mongoose connection error:", err);
  });

// Routes
app.use("/app/vr1", placeRoutes);
app.use("/app/vr1", userRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Start the server
// const port = process.env.PORT;
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
