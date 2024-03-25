//importo el archivo constants con info de cada tipo de error
const {constants} = require("../constants")

const errorHandler = (err, req, res, next) => {
    //si res.statusCoude es True asignarlo a status, de lo contrario 500
    const statusCode = res.statusCode ? res.statusCode : 500;
    
    switch (statusCode) {
        case constants.VALIDATION_ERROR: 
        res.json({
            title:"Validation failed", 
            message: err.message, 
            stackTrace: err.stack //stacktrace es el mensage largo de error
        }); 
          break;
        case constants.UNAUTHORIZED: 
        res.json({
            title:"Unauthorized", 
            message: err.message, 
            stackTrace: err.stack
        });
        case constants.FORBIDDEN: 
        res.json({
            title:"Forbidden", 
            message: err.message, 
            stackTrace: err.stack
        });
        case constants.NOT_FOUND: 
        res.json({
            title:"Not found", 
            message: err.message, 
            stackTrace: err.stack
        });
        default: 
            console.log("No error, all good");
            break;
    }
    res.json({title:"Not found", message: err.message, stackTrace: err.stack}); //stacktrace es el mensage largo de error
};

module.exports = {errorHandler};