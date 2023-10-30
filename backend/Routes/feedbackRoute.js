const express = require("express");
const router = express.Router();
const { isAuthenticator, isUserAuthorized } = require("../Middleware/auth");
const { addReview } = require("../controller/feedbackController");


router.route('/add-review').post(isAuthenticator,addReview)

module.exports = router
