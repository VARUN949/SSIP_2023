const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model (assuming you have a User model)
    required: true
  },
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlaceSchema", // Reference to the Place model (assuming you have a Place model)
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  image:{
    type:String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
