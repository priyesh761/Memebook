require('dotenv').config();
require('./model');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const Controller = require('./routes');
const Middleware = require('./middleware');

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", Controller.AuthenticationController);


app.use(Middleware.ErrorHandler);


const { APP_PORT } = process.env;
const port = APP_PORT || 3000;
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
});

