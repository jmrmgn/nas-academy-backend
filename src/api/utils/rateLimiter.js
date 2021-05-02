/**
 - ipAddresses { [ipAddress]: { count: <number>, requestTimestamp  }  }
 - get user ip address
 - check if in ipAddresses{}
    - FALSE: insert in object
    - TRUE:
      - check if requestAgainAfter exist AND currentTimestamp <= ipAddresses.requestAgainAfter:
        - TRUE:
          - return Error Message "Too many requests from this IP, please try again later"
        - FALSE:
          - check if ipAddresses.count === 10;
            TRUE:
              - update ipAddresses.requestAgainAfter: currentTimestamp + 10 seconds
              - return Error Message "Too many requests from this IP, please try again later"
            FALSE:
              - get ipAddresses.requestTimestamp
              - check if the timestamp is less than 10 seconds
                - TRUE:
                  - ipAddresses.count++
                - FALSE:
                  - ipAddress.requestTimestamp = currentTimestamp
                  - ipAddress.count = 1
 */

const store = {};

const getIpAddress = (req) => {
  return String(req.headers['x-forwarded-for'] || req.connection.remoteAddress);
};

const addSeconds = (timestamp, value = 10) => {
  const secondsValue = value * 1000; // value * milliseconds(60secs)
  const dateObject = new Date(timestamp);

  const result = dateObject.getTime() + secondsValue;

  return result;
};

const rateLimiter = (req, res, next) => {
  // Defaults to add in .env
  const MILLISECONDS = 1000;
  const RESET_SECONDS = 5;
  const LIMIT_SECONDS = 10;

  const ipAddress = getIpAddress(req);
  const currentTimestamp = Date.now();

  if (!store[ipAddress]) {
    store[ipAddress] = {
      count: 1,
      requestTimestamp: currentTimestamp,
      limitRequestAt: addSeconds(currentTimestamp),
    };
    next();
  } else {
    const { requestTimestamp, count, requestAgainAfter, limitRequestAt } =
      store[ipAddress] ?? {};

    if (requestAgainAfter && currentTimestamp <= requestAgainAfter) {
      // return error Message
      console.log('##### Request again after', new Date(requestAgainAfter));
    } else {
      if (count === LIMIT_SECONDS) {
        // return error Message
        store[ipAddress].requestAgainAfter = currentTimestamp + RESET_SECONDS;
        console.log(
          '##### Too many requests from this IP, please try again later'
        );
      } else {
        console.log('### currentTimestamp', currentTimestamp);
        console.log('### limitRequestAt', limitRequestAt);
        if (currentTimestamp < limitRequestAt) {
          console.log('## Increment count...');
          store[ipAddress].count += 1;
        } else {
          // will reset request entry
          console.log('## Resetting...');
          store[ipAddress].requestTimestamp = currentTimestamp;
          store[ipAddress].limitRequestAt = addSeconds(currentTimestamp);
          store[ipAddress].count = 1;
        }

        next();
      }
    }
  }

  console.log('@@@@ STORE', store);
};

module.exports = rateLimiter;
