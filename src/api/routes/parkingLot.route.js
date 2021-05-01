const router = require('express').Router();

// Controllers
const ParkingLotController = require('../controllers/parkingLot.controller');

router
  .route('/park')
  /**
   * @endpoint    {POST} /parking-lot/park Park a Car
   * @description Park a car and returns the slot number where it is parked
   *
   * @apiBody  {String}  Car number
   * @apiBody  {Number}  Slot number
   *
   * @success   {Object}  Parking Lot Slot entry
   */
  .post(ParkingLotController.park);

router
  .route('/unpark/:carNumber')
  /**
   * @endpoint    {DELETE} /parking-lot/unpark Unpark the car
   * @description Unpark the car and free the slot
   *
   * @apiParam  {String}  Car number
   *
   * @success   {204 No Content}
   */
  .delete(ParkingLotController.unpark);

module.exports = router;
