const mongoose = require('mongoose');

const PlaceSchema = mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    placeCategory: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        // required: true
    },
    placeAddress: {
        textAddress: {
            type: String,
            // required: true
        },
        pinCode: {
            type: Number,
            // required: true
        },
        coordinates: {
            latitude: {
                type: Number
            },
            longitude: {
                type: Number
            }
        }
    },
    images: [{
        type: String
    }],
    contactNo: {
        type: Number
    },
    timings: {
        opening: {
            type: Date,
            default: Date.now()
        },
        closing: {
            type: Date,
            default: Date.now()
        }
    },
    entryFees: {
        type: Number // Add specific data type for entry fees (if it's a number)
    },
    numberOfFeedback: {
        type: Number,
        // required: true,
        default:0
    },
    feedback: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Assuming you have a User model, replace it with the actual model name if different
            // required: true
        },
        comment: {
            type: String,
            // required: true
        },
        image:{
            type: String,
        },
        
    }]
});

module.exports = mongoose.model('Place', PlaceSchema);
