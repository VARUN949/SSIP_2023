const express = require("express");
const router = express.Router();
const { isAuthenticator, isUserAuthorized } = require("../Middleware/auth");
const { addFeedback } = require("../controller/feedbackController");
// const { addReview } = require("../controller/feedbackController");
// const { addFeedback } = require("../Model/feedbackModel");


router.route('/add-review').post(isAuthenticator,addFeedback)

module.exports = router
