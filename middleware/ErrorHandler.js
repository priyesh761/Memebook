const { ErrorResponse } = require("../model");

module.exports = errorHandler = (err, req, res, next) => {
    console.log(err);
    if (err instanceof ErrorResponse)
        res.status(err.statusCode).json({ message: err.message });
    else {
        res.status(500).json({ message: "Internal Server Error" });
    }
};