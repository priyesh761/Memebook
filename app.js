require('dotenv').config();
require('./model');
const mongoose = require('mongoose');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Controller = require('./routes');
const Middleware = require('./middleware');

const app = express();

app.use(compression);
app.use(cookieParser);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Controllers
app.use("/", Controller.AuthenticationController);
app.use("/test", express.static(`${__dirname}/coverage/lcov-report`));

app.use(Middleware.ErrorHandler);

const { APP_PORT } = process.env;
const port = APP_PORT || 8080;

var db = mongoose.connection;

db.once('open', () => app.listen(port, () => console.log(`Example app listening on port ${port}!`)));

module.exports = app