const router = require('express').Router();

// Controllers
const ParkingLotController = require('../controllers/parkingLot.controller');

router
  .route('/park')
  /**
   * @endpoint    {POST} /parking-lot/park Park a Car
   * @description Park a car and returns the slot number where it is parked
   *
   * @apiParam  {String}  Car number
   * @apiParam  {Number}  Slot number
   *
   * @success   {Object}  Parking Lot Slot entry
   */
  .post(ParkingLotController.park);

module.exports = router;
