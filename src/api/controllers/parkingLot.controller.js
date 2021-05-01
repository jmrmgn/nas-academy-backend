const { ParkingLot } = require('../models');

exports.park = (req, res, next) => {
  try {
    const { carNumber, slotNumber } = req.body;

    const parkEntry = { carNumber, slotNumber };

    const createdEntry = ParkingLot.insert(parkEntry);

    res.status(201).json(createdEntry);
  } catch (error) {
    console.error(error);
  }
};
