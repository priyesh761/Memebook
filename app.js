require('dotenv').config();
require('./model');
const mongoose = require('mongoose');
const express = require('express');
const compression = require('compression');

const cookieParser = require("cookie-parser");
const { json, urlencoded } = require('body-parser');
const { AuthenticationController } = require('./routes');
const { Authorize, ErrorHandler } = require('./middleware');

const app = express();

app.use(compression());
app.use(cookieParser());
app.use(json());
app.use(urlencoded({ extended: true }));

// Controllers
app.use("/", AuthenticationController);
app.use("/coverage", express.static(`${__dirname}/coverage/lcov-report`));


app.use(ErrorHandler);

const { APP_PORT } = process.env;
const port = APP_PORT || 8080;

var db = mongoose.connection;

if (process.env.NODE_ENV != "Test")
    db.once('open', () => app.listen(port, () => console.log(`Example app listening on port ${port}!`)));

module.exports = app;