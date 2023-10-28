const mongoose = require("mongoose")

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

})


module.exports = mongoose.model("PlaceSchema",PlaceSchema);