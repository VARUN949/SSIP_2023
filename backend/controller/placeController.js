const PlaceSchema = require("../Model/placeModel");
const catcherror = require("../Middleware/catcherror");
const ErrorHandler = require("../utils/errorHandler");
const OPENCAGE_API_KEY = "7700f6c46f554c4d94a649d707308d93";
const axios = require("axios");

// To add place by admin:
exports.addPlace = catcherror(async (req, res, next) => {
  const data = req.body;
  const Place = await PlaceSchema.create(data);
  if (Place) {
    res.status(201).json({
      success: true,
      Place,
    });
  } else {
    next(new ErrorHandler("Can't Add Place"));
  }
});

// To update place by admin:

exports.updatePlace = catcherror(async (req, res, next) => {
  const data = req.body;
  const isThere = await PlaceSchema.findById(req.params.Id);

  if (!isThere) {
    return next(new ErrorHandler("Place not found", 404));
  }
  const Place = await PlaceSchema.findByIdAndUpdate(req.params.Id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (Place) {
    res.status(201).json({
      success: true,
      Place,
    });
  } else {
    return next(new ErrorHandler("Some internal Error occured", 404));
  }
});

// To delete place by admin:

exports.deletePlace = catcherror(async (req, res, next) => {
  const isThere = await PlaceSchema.findById(req.params.Id);
  if (!isThere) {
    return next(new ErrorHandler("Place not found", 404));
  }
  const Place = await PlaceSchema.findByIdAndDelete(req.params.Id);
  if (Place) {
    res.status(201).json({
      success: true,
    });
  } else {
    return next(new ErrorHandler("Some internal Error occured", 404));
  }
});


// To get place by pincode :

exports.getPlace = catcherror(async (req, res, next) => {
  // const resultperpage =5;
  // const Places = await PlaceSchema.countDocuments()
  // const apifeature = new ApiFeature(PlaceSchema.find(),req.query)
  // .search()
  // .filter()
  // .Pagination(resultperpage)

  // const place = await apifeature.query
  const pinCode = req.query.pinCode;
  if (pinCode) {
    const places = await PlaceSchema.find({
      "placeAddress.pinCode": parseInt(pinCode),
    });
    if (places?.length > 0) {
      res.status(200).json({
        success: true,
        places: places,
      });
    } else {
      return next(new ErrorHandler("No places for given pincode find", 404));
    }
  } else {
    const places = await PlaceSchema.find();
    if (places?.length > 0) {
      res.status(200).json({
        success: true,
        places: places,
      });
    } else {
      return next(new ErrorHandler("Some internal Error occured", 404));
    }
  }
});

// To get location by text address :
// not working properly due to free api is not efficient

exports.getlocation = catcherror(async (req, res, next) => {
  const location = req.body;
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        location
      )}&key=${OPENCAGE_API_KEY}`
    );

    if (response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry;
      res.json({ latitude: lat, longitude: lng });
    } else {
      res.status(404).json({ error: "Location not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// try to find places of our database through textaddress.

exports.getgovLocation = catcherror(async (req, res, next) => {
  const textAddress = req.body.textAddress;

  if (textAddress) {
    // Filter places based on the textAddress provided in the query parameters
    const places = await PlaceSchema.find({
      "placeAddress.textAddress": { $regex: textAddress, $options: "i" },
    });
    const data = places.placeAddress;
    res.status(200).json({
      success: true,
      data,
    });
  } else {
    // Handle the case when no textAddress is provided in the query parameters
    res.status(400).json({
      success: false,
      message: "textAddress parameter is missing in the query.",
    });
  }
});
