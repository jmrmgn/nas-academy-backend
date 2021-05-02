// Planning for this test case but can't use library like jest and supertest. Sorry :(

/**
 *
 * Par a Car Test
 *
 *
 * it should return error when carNumber and slotNumber is empty
 * it should return error when the Parking Lot is Full
 * it should return error when the Car is already parked
 * it should return error when the Slot number is already occupied
 * it should be able to Park a Car { carNumber, slotNumber, timeParked }
 */

/**
 *
 * Unpark the car
 *
 *
 * it should return ValidationError if carNumber is empty and not string
 * it should return 404 Not Found if the Car was not found in the Parking Lot
 * it should be able to Unpark the car { 204 No Content }
 */

/**
 *
 * Get the car/slot number information
 *
 *
 * it should return Validation Error of params.number empty and params.type is not in ['car-number', 'slot-number']
 * it should return 404 Not Found if the Car/Slot number is not found
 * it should be able to return information
 */
