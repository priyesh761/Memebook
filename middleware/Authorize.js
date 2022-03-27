const jwt = require("jsonwebtoken");
const { ErrorResponse } = require("../model");

const { AUTH_TOKEN_SECRET } = process.env;

const verifyToken = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token)
            throw new ErrorResponse(401, 'You need to Login')

        const decrypt = await jwt.verify(token, AUTH_TOKEN_SECRET);
        req.user = {
            id: decrypt.id,
        };

    } catch (err) {
        next(err);
    }
    next();
};

module.exports = verifyToken;