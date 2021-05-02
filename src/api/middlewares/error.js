const { NODE_ENV } = require('../../config/vars');
const { httpStatus } = require('../utils/constants');
const APIError = require('../utils/APIError');

/**
 * Error Handler
 *
 * Middleware that handles API Errors
 */
const errorHandler = (err, req, res, next) => {
  const response = {
    code: err.status ?? httpStatus.SERVER_ERROR,
    message: err.message ?? 'Error ocurred',
    errors: err.errors,
    stack: err.stack,
  };

  if (NODE_ENV !== 'development') {
    delete response.stack;
  }

  return res.status(err.status ?? httpStatus.SERVER_ERROR).json(response);
};

/**
 * Catch 404 and forward to error handler
 *
 */
const notFoundHandler = (req, res, next) => {
  const err = new APIError({
    message: 'Not found',
    status: httpStatus.NOT_FOUND,
  });
  return errorHandler(err, req, res);
};

module.exports = { errorHandler, notFoundHandler };
