const { ErrorResponse } = require("../model");
const { JsonWebTokenError, TokenExpiredError } = require('jsonwebtoken');

module.exports = errorHandler = (err, req, res, next) => {
    console.log(err);
    if (err instanceof ErrorResponse)
        res.status(err.statusCode).json({ message: err.message });
    else if (err instanceof JsonWebTokenError)
        res.status(401).json({ message: "Invalid Token / Login Session has expired" });
    else
        res.status(500).json({ message: "Internal Server Error" });

};