/**
 * Add seconds to timestamp
 *
 * Add seconds to the given timestamp
 *
 * @param {Date} timestamp - Timestamp value to perform addition
 * @param {number} value - value to be added in the timestamp
 *
 */
const addSeconds = (timestamp, value = 10) => {
  const secondsValue = value * 1000; // value * milliseconds(60secs)
  const dateObject = new Date(timestamp);

  const result = dateObject.getTime() + secondsValue;

  return result;
};

module.exports = { addSeconds };
