// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const placeRoutes = require("./Routes/routePlace");
const userRoutes = require("./Routes/userRoute");
const errorMiddleware = require("./Middleware/errors");

// Load environment variables from config file
if (process.env.DOTENV_CONFIG_PATH) {
  dotenv.config({ path: process.env.DOTENV_CONFIG_PATH });
} else {
  dotenv.config(); // Load from default path if DOTENV_CONFIG_PATH is not set
}

// Initialize Express app
const app = express();

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
const port = process.env.PORT || 12500;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
