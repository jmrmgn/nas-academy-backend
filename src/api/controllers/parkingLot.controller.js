const { ParkingLot } = require('../models');
const { httpStatus, numberType } = require('../utils/constants');
const APIError = require('../utils/APIError');

/**
 * Park a Car
 *
 * Park a car and returns the slot number where it is parked
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

    // Check if the Car is already parked
    const isCarAlreadyParked = ParkingLot.find(carNumber);
    if (isCarAlreadyParked) {
      throw new APIError({
        status: httpStatus.UNPROCESSABLE_ENTITY,
        message: 'Car is already parked',
      });
    }

    // Park car if Parking is not full
    const createdEntry = ParkingLot.insert(parkEntry);

    res.status(httpStatus.CREATED).json(createdEntry);
  } catch (error) {
    next(error);
  }
};

/**
 * Unpark the Car
 *
 */
exports.unpark = (req, res, next) => {
  try {
    const { carNumber } = req.params;

    // Check if the car is parked
    const isCarParked = ParkingLot.find(carNumber);

    if (!isCarParked) {
      throw new APIError({
        status: httpStatus.NOT_FOUND,
        message: 'Car not found',
      });
    }

    // Remove car in the slot
    ParkingLot.remove(carNumber);

    res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};

/**
 * Get the Car/Slot Information
 *
 * Return the car number and slot number based on given number
 */
exports.getInformation = (req, res, next) => {
  try {
    // Default numberType is car-number
    const { number, type = 'car-number' } = req.params;

    // Get number type
    const selectedNumberType = numberType[type];

    const result = ParkingLot.findByType(number, selectedNumberType);

    if (!result) {
      throw new APIError({
        status: httpStatus.NOT_FOUND,
        message: 'Not Found',
      });
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};
