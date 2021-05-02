const {
  RESET_SECONDS,
  REQUEST_LIMIT,
  REQUEST_TIME_FRAME,
} = require('../../config/vars');
const isEmpty = require('../utils/isEmpty');
const { addSeconds } = require('../helpers/time');
const { httpStatus } = require('../utils/constants');
const APIError = require('../utils/APIError');

// Storage of all IP Address
const store = {};

/**
 *
 * @param {req} req - Request from express
 */
const getIpAddress = (req) => {
  return String(req.headers['x-forwarded-for'] || req.connection.remoteAddress);
};

/**
 * Rate Limiter
 *
 * Middleware that limit requests based on the given restrictions
 */
const rateLimiter = (req, res, next) => {
  const ipAddress = getIpAddress(req);
  const currentTimestamp = Date.now();

  try {
    // If ip address exist, then create one
    if (!store[ipAddress]) {
      store[ipAddress] = {
        count: 1,
        requestTimestamp: currentTimestamp,
        registered: new Date(currentTimestamp).toString(),
      };
      next();
    } else {
      const { requestTimestamp, count, requestAgainAfter, limitRequestAt } =
        store[ipAddress] ?? {};

      const isRestricted = requestAgainAfter > currentTimestamp;
      const isCountExceed = count >= REQUEST_LIMIT;

      // If restriced due to many requests
      if (isRestricted) {
        throw new APIError({
          status: httpStatus.TOO_MANY_REQUESTS,
          message: `Too many requests from this IP, please try again after ${new Date(
            requestAgainAfter
          ).toString()}`,
        });
      }

      // If count exceed
      if (isCountExceed) {
        const requestAgainValue = addSeconds(currentTimestamp, RESET_SECONDS);
        store[ipAddress].count = 1;
        store[ipAddress].requestAgainAfter = requestAgainValue;
        store[ipAddress].limitRequestAt = addSeconds(
          currentTimestamp,
          REQUEST_TIME_FRAME
        );

        throw new APIError({
          status: httpStatus.TOO_MANY_REQUESTS,
          message: `This IP is restricted from sending requests. try again after ${new Date(
            requestAgainValue
          ).toString()}`,
        });
      }

      // Will reset the ipAddress entry if over limitRequestAt
      if (currentTimestamp > limitRequestAt) {
        store[ipAddress].count = 1;
        store[ipAddress].requestTimestamp = currentTimestamp;
        store[ipAddress].limitRequestAt = addSeconds(
          currentTimestamp,
          REQUEST_TIME_FRAME
        );
        if (store[ipAddress].requestAgainAfter) {
          delete store[ipAddress].requestAgainAfter;
        }
      } else {
        store[ipAddress].count += 1;
      }

      next();
    }

    // console.log('==> STORE', store);
  } catch (error) {
    next(error);
  }
};

module.exports = rateLimiter;
