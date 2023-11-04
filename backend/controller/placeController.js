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

exports.getBycategory = catcherror(async(req,res,next)=>{
  const category = req.query.category
  // console.log(category)
  if (category) {
    // console.log(category)
    const places = await PlaceSchema.find({
      placeCategory: { $regex: category, $options: "i" } // Case-insensitive search
    });
    // console.log(places)
    if (places.length > 0) {
      res.status(200).json({
        success: true,
        places: places
      });
    } else {
      return next(new ErrorHandler("No places found for the given keyword.", 404));
    }
  } else {
    return next(new ErrorHandler("Keyword parameter is missing in the query.", 400));
  }
})

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

// get Place by name
exports.getPlaceByName = catcherror(async (req, res, next) => {
  const keyword = req.query.keyword;

  if (keyword) {
    const places = await PlaceSchema.find({
      name: { $regex: keyword, $options: "i" } // Case-insensitive search
    });
    if (places.length > 0) {
      res.status(200).json({
        success: true,
        places: places
      });
    } else {
      return next(new ErrorHandler("No places found for the given keyword.", 404));
    }
  } else {
    return next(new ErrorHandler("Keyword parameter is missing in the query.", 400));
  }
});

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance; // Distance in kilometers
}


exports.loactionByCoordinates = async (req, res) => {
  const { lat, lon, maxDistance } = req.body; // Latitude, longitude, and maximum distance in kilometers

  const latitude = parseFloat(lat);
  const longitude = parseFloat(lon);
  const distanceInRadians = maxDistance / 6371;
  try {
    // console.log(lat,lon,maxDistance)
    // Find places within the specified distance
    const places = await PlaceSchema.find({
      'placeAddress.coordinates': {
        $geoWithin: {
          $centerSphere: [[latitude, longitude], distanceInRadians] // Convert distance to radians
        }
      }
    });    
    // console.log(places)

    // Calculate distances for each place and sort the places array based on distances
    places.forEach(place => {
      const distance = calculateDistance(23.026952715584258, 72.58593030906115, place.placeAddress.coordinates.latitude, place.placeAddress.coordinates.longitude);
      place.distance = distance; // Add the distance property to the place object
    });

    // Sort places by distance (ascending order)
    places.sort((a, b) => a.distance - b.distance);

    res.json({ success: true, places });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


