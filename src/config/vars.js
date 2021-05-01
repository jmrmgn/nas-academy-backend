const DEFAULT_PORT = 3000;
const DEFAULT_PARKING_LOT_SIZE = 5;

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || DEFAULT_PORT,
  PARKING_LOT_SIZE: process.env.PARKING_LOT_SIZE || DEFAULT_PARKING_LOT_SIZE,
};
