const feedbackSchema = require("../Model/feedbackModel")
const PlaceSchema = require("../Model/placeModel");
const catcherror = require("../Middleware/catcherror");
const ErrorHandler = require("../utils/errorHandler");


exports.addReview = catcherror(async(req,res,next)=>{
    const user = req.user;
    const { comment, placeId } = req.body;
    
    const place = await PlaceSchema.findById(placeId);
    if(!place){
        return next(new ErrorHandler("Place Not FOund", 401));
    }

    const feedback = await feedbackSchema.create({user,comment,place:placeId})
    // console.log(feedback)
    place.feedback[1].push(feedback);
    await place.save();
    
    res.status(201).json({
        success:true,
    })

})