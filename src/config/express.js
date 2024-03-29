const express = require('express');
const app = express();

// Middlewares
const { errorHandler, notFoundHandler } = require('../api/middlewares/error');
const rateLimiter = require('../api/middlewares/rateLimiter');

// Parsing JSON
app.use(express.json());

// All API Routes
const routes = require('../api/routes');

app.use(rateLimiter);

// Mounting Routes
app.use('/api', routes);

// catch 404 and forward to error handler
app.use(notFoundHandler);

// API Error handler, send stacktrace only during development
app.use(errorHandler);

module.exports = app;
