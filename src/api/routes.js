const express = require('express');
const controllers = require('./controllers');

const app = express();
app.get('/', controllers.welcome);

module.exports = app;
