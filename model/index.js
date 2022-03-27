const mongoose = require('mongoose');
const ErrorResponse = require('./ErrorResponse');
const { MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log("Connected to Database"))
    .catch((err) => console.log(`Failed to connected Database-${err.message}`));

const User = mongoose.model('User', require('./User'));

module.exports = {
    User: User,
    ErrorResponse: ErrorResponse
}