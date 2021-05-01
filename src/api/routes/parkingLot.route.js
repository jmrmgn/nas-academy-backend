const router = require('express').Router();

// Controllers
const ParkingLotController = require('../controllers/parkingLot.controller');

router
  .route('/park')
  /**
   * @api    {POST} /parking-lot/park Park a Car
   * @apiDescription Park a car and returns the slot number where it is parked
   *
   * @apiBody  {String}  carNumber  - Car number
   * @apiBody  {Number}  slotNumber - Slot number
   *
   * @apiSuccess   {Object}  Parking Lot Slot entry
   */
  .post(ParkingLotController.park);

router
  .route('/park/:number/:type?')
  /**
   * @api    {GET} /parking-lot/park/:number/:type Get Car/Slot Information
   * @apiDescription Return the car number and slot number based on given number
   *
   * @apiParam  {String}  number  - Car/Slot Number
   * @apiParam  {String}  type    - Number Type
   *
   * @apiSuccess   {Object}  Parking Lot Slot entry
   */
  .get(ParkingLotController.getInformation);

router
  .route('/unpark/:carNumber')
  /**
   * @api    {DELETE} /parking-lot/unpark Unpark the car
   * @apiDescription Unpark the car and free the slot
   *
   * @apiParam  {String}  carNumber - Car number
   *
   * @apiSuccess   {204 No Content}
   */
  .delete(ParkingLotController.unpark);

module.exports = router;
