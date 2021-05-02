const { NODE_ENV } = require('../../config/vars');
const { httpStatus } = require('../utils/constants');

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

module.exports = { errorHandler };
