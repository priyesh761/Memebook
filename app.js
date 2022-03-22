const dotenv = require('dotenv');
const express = require('express');
const compression = require('compression');

dotenv.config();

const app = express();

app.use(compression());

require('./model')

const { APP_PORT } = process.env;
const port = APP_PORT || 3000;


app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
});

