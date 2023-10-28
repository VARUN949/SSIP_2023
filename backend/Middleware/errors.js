const ErrorHandler = require("../utils/errorHandler");

module.exports = (err,req,res,next) =>{
    // eslint-disable-next-line no-unused-expressions
    err.Statuscode = err.Statuscode ||500,
    err.message = err.message || "internal error"

// for mongodb id errors

    if(err.name== "CastError"){
        const message = "Resourse not found invalid id"
        err = new ErrorHandler(message,400);
    }
    if(err.name== "JsonWebTokenError"){
        const message = "Web token is invalid,try again"
        err = new ErrorHandler(message,400);
    }
    if(err.name== "TokenExpiredError"){
        const message = "Web token is expired,try again"
        err = new ErrorHandler(message,400);
    }
    if(err.code== 11000){
        const message = `${Object.keys(err.keyValue)} already registerd try with different`
        err = new ErrorHandler(message,400);
    }

    res.status(err.Statuscode).json({
        success:false,
        message:err.message,
    })
}