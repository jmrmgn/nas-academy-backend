const { ParkingLot } = require('../models');
const { httpStatus } = require('../utils/constants');
const APIError = require('../utils/APIError');

exports.park = (req, res, next) => {
  try {
    throw new APIError({
      status: httpStatus.UNPROCESSABLE_ENTITY,
      message: 'Parking Lot is full',
    });
    // const { carNumber, slotNumber } = req.body;

    // const parkEntry = { carNumber, slotNumber };

    // const createdEntry = ParkingLot.insert(parkEntry);

    // res.status(201).json(createdEntry);
  } catch (error) {
    next(error);
  }
};
