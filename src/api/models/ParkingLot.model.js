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

  find(carNumber) {
    let result = this.parkingLot;

    if (carNumber) {
      result = this.parkingLot.find((entry) => entry.carNumber === carNumber);
    }

    return result;
  }

  remove(carNumber) {
    if (carNumber) {
      const updatedLots = this.parkingLot.filter(
        (entry) => entry.carNumber !== carNumber
      );

      this.parkingLot = updatedLots;
      return;
    }
  }

  insert({ carNumber, slotNumber }) {
    const newEntry = { carNumber, slotNumber, timeParked: new Date() };
    this.parkingLot.push(newEntry);

    console.log('==> parkingLot', this.parkingLot);
    return newEntry;
  }

  getAvailableSlots() {
    const parkingLotLength = this.count();
    const currentParkingLotSize = PARKING_LOT_SIZE - parkingLotLength;

    return currentParkingLotSize;
  }

  findByType(number, type) {
    let result = this.parkingLot;

    if (number) {
      result = this.parkingLot.find(
        (entry) => String(entry[type]) === String(number)
      );
    }

    return result;
  }
}

module.exports = new ParkingLot();
