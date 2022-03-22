const { isEmail, isAlpha, isStrongPassword } = require('validator');
let moongoose = require("mongoose");
let Schema = moongoose.Schema;

let UserSchema = new Schema({
    FirstName: {
        type: String,
        required: true,
        validate: [isAlpha, 'Invalid First name']
    },
    LastName: {
        type: String,
        required: true,
        validate: [isAlpha, 'Invalid Last name']
    },
    Email: {
        type: String,
        required: true,
        validate: [isEmail, 'Invalid email']
    },
    Password: {
        type: String,
        required: true,
        validate: [isStrongPassword, 'Password should have minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1']
    },
});

module.exports = UserSchema;
