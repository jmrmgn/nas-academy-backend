const { ParkingLot } = require('../models');
const { httpStatus } = require('../utils/constants');
const APIError = require('../utils/APIError');

/**
 * Park a Car
 *
 * Park a car and returns the slot number where it is parked
 * @public
 */
exports.park = (req, res, next) => {
  try {
    const { carNumber, slotNumber } = req.body;
    const parkEntry = { carNumber, slotNumber };

    // Check if Parking lot is full
    const isParkingLotFull = ParkingLot.getAvailableSlots() === 0;
    if (isParkingLotFull) {
      throw new APIError({
        status: httpStatus.UNPROCESSABLE_ENTITY,
        message: 'Parking Lot is full',
      });
    }

    // Park car if Parking is not full
    const createdEntry = ParkingLot.insert(parkEntry);

    res.status(httpStatus.CREATED).json(createdEntry);
  } catch (error) {
    next(error);
  }
};
