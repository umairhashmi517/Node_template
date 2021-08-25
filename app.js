require('dotenv').config();
const express = require('express');
const app = express();
require('./config/db').connect();

app.use('/', require('./routes'));

module.exports = app;