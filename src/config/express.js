const express = require('express');
const app = express();

// Parsing JSON
app.use(express.json());

// All API Routes
const routes = require('../api/routes');

app.use('/', routes);

module.exports = app;
