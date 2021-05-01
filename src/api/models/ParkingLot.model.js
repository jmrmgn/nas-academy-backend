/**
  fields {
    carNumber: String (unique)
    slotNumber: String
    timeParked: Date(yyyy-mm-dd hh:mm:ss)
  }
 */

const { PARKING_LOT_SIZE } = require('../../config/vars');

class ParkingLot {
  parkingLot = [];

  constructor(carNumber, slotNumber, timeParked) {
    this.carNumber = carNumber;
    this.slotNumber = slotNumber;
    this.timeParked = timeParked;
  }

  count() {
    const parkingLotLength = this.parkingLot.length;
    return parkingLotLength;
  }

  insert({ carNumber, slotNumber }) {
    const newEntry = { carNumber, slotNumber, timeParked: new Date() };
    this.parkingLot.push(newEntry);

    console.log('==> parkingLot', this.parkingLot);
    return newEntry;
  }
}

module.exports = new ParkingLot();
