const { numberType } = require('../utils/constants');

module.exports = {
  // POST /api/park
  park: {
    body: {
      carNumber: { required: true, isString: true },
      slotNumber: { required: true, isString: true },
    },
  },
  // DELETE /api/unpark/:carNumber
  unpark: {
    params: {
      carNumber: { required: true, isString: true },
    },
  },
  // GET /api/park/:number/:type
  getInformation: {
    params: {
      number: { required: true, isString: true },
      type: { array: ['', numberType.CAR_LABEL, numberType.SLOT_LABEL] },
    },
  },
};
