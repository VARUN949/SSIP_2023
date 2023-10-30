const mongoose = require("mongoose")


const FeedbackSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
});

const PlaceSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    placeCategory:{
        type:String,
        required:true,
    },
    placeAddress:{
        textAddress:{
            type:String,
            required:true,
        },
        pinCode:{
            type:Number,
            required:true,
        },
        coordinates:[{
            lattitude:{
                type:Number,
            },
            longitude:{
                type:Number,
            }
        }]
    },
    images:{
        type:String,
    },
    contactNo:{
        type:Number,
    },
    timings:{
        opening:{
        type:Date,
        default:Date.now()
        },
        closing:{
        type:Date,
        default:Date.now()
        },
        
    },
    numofFeedback:{
        type:Number
    },
    feedback:[FeedbackSchema],
})


module.exports = mongoose.model("PlaceSchema",PlaceSchema);