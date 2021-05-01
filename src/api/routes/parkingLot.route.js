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
  .route('/park/:number/:type?')
  /**
   * @endpoint    {GET} /parking-lot/park/:number/:type Get Car/Slot Information
   * @description Return the car number and slot number based on given number
   *
   * @apiParam  {String}  number  - Car/Slot Number
   * @apiParam  {String}  type    - Number Type
   *
   * @success   {Object}  Parking Lot Slot entry
   */
  .get(ParkingLotController.getInformation);

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
