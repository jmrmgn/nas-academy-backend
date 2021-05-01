const router = require('express').Router();

// Controllers
const ParkingLotController = require('../controllers/parkingLot.controller');

router.route('/park').post(ParkingLotController.park);

module.exports = router;
