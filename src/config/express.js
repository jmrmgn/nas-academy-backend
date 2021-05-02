const express = require('express');
const app = express();

const { errorHandler } = require('../api/middlewares/error');
const rateLimiter = require('../api/utils/rateLimiter');

// Parsing JSON
app.use(express.json());

// All API Routes
const routes = require('../api/routes');

// Mounting Routes
app.use('/', rateLimiter, routes);

// API Error handler, send stacktrace only during development
app.use(errorHandler);

module.exports = app;
