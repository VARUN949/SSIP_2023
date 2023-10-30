// Import required modules
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cron = require('node-cron'); // Import node-cron package
const placeRoutes = require("./Routes/routePlace");
const userRoutes = require("./Routes/userRoute");
const feedbackRoute = require('./Routes/feedbackRoute')
const errorMiddleware = require("./Middleware/errors");
const axios = require('axios');

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
app.use("/app/vr1", feedbackRoute);

// Error handling middleware
app.use(errorMiddleware);



// Cron Job - Run every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  try {
    const response = await fetch('http://localhost:12500/fake');
    if (response.ok) {
      const data = await response.json();
      console.log('Fetched data:', data);
      // Perform further operations with the fetched data, such as saving it to a database or processing it.
    } else {
      console.error('Error fetching data:', response.status);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

app.get("/fake",(req,res)=>{
  res.json({
    message:"hello fake api"
  })
})

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
