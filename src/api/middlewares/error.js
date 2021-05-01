const { NODE_ENV } = require('../../config/vars');

const errorHandler = (err, req, res, next) => {
  const response = {
    code: err.status,
    message: err.message || 'Error ocurred',
    errors: err.errors,
    stack: err.stack,
  };

  if (NODE_ENV !== 'development') {
    delete response.stack;
  }

  res.status(err.status).json(response);
};

module.exports = { errorHandler };
