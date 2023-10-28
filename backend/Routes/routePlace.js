const express = require("express");
const { addPlace, updatePlace, deletePlace, getPlace, getlocation, getgovLocation } = require("../controller/placeController");
const { isAuthenticator, isUserAuthorized } = require("../Middleware/auth");
const router = express.Router();

router.route("/addplace").post(isAuthenticator, isUserAuthorized("admin"),addPlace);
router.route("/getplace").get(isAuthenticator,getPlace);
router.route("/getgovlocation").get(isAuthenticator,getgovLocation);
router.route("/updateplace/:Id").put(isAuthenticator, isUserAuthorized("admin"),updatePlace);
router.route("/deleteplace/:Id").delete(isAuthenticator, isUserAuthorized("admin"),deletePlace);

module.exports = router
