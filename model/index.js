const mongoose = require('mongoose');
const { MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        mongoose.model('User', require('./user'));
        console.log("Connected to Database");
    });

