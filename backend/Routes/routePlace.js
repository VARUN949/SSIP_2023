const express = require("express");
const { addPlace, updatePlace, deletePlace, getPlace, getlocation, getgovLocation, getPlaceByName, loactionByCoordinates, getBycategory } = require("../controller/placeController");
const { isAuthenticator, isUserAuthorized } = require("../Middleware/auth");
const router = express.Router();

router.route("/addplace").post(addPlace);
router.route("/getplace").get(getPlace);
router.route("/get-bylocation").get(loactionByCoordinates);
router.route("/getgovlocation").get(getPlaceByName);
router.route("/getlocation/category").get(getBycategory);
router.route("/updateplace/:Id").put(updatePlace);
router.route("/deleteplace/:Id").delete(deletePlace);

module.exports = router
