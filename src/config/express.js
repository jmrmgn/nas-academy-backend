const express = require('express');
const app = express();

// All API Routes
const routes = require('../api/routes');

app.use('/', routes);

module.exports = app;
