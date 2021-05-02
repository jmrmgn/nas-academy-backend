const express = require('express');
const router = express.Router();

// Routes
const parkingLotRoutes = require('./parkingLot.route');

router.get('/greetings', (req, res) =>
  res.send('Hello World from NAS ACADEMY!')
);

// Parking Lot Routes
router.use('/', parkingLotRoutes);

module.exports = router;
