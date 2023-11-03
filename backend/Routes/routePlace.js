const express = require("express");
const { addPlace, updatePlace, deletePlace, getPlace, getlocation, getgovLocation, getPlaceByName, loactionByCoordinates } = require("../controller/placeController");
const { isAuthenticator, isUserAuthorized } = require("../Middleware/auth");
const router = express.Router();

router.route("/addplace").post(isAuthenticator, isUserAuthorized("admin"),addPlace);
router.route("/getplace").get(isAuthenticator,getPlace);
router.route("/get-bylocation").get(isAuthenticator,loactionByCoordinates);
router.route("/getgovlocation").get(isAuthenticator,getPlaceByName);
router.route("/updateplace/:Id").put(isAuthenticator, isUserAuthorized("admin"),updatePlace);
router.route("/deleteplace/:Id").delete(isAuthenticator, isUserAuthorized("admin"),deletePlace);

module.exports = router
