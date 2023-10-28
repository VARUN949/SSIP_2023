class ErrorHandler extends Error{
    constructor(message,Statuscode){
        super(message)
        this.Statuscode=Statuscode
        Error.captureStackTrace(this,this.constructor);
    }

} 
module.exports = ErrorHandler