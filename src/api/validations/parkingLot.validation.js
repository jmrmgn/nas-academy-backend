module.exports = {
  // POST /parking-lot/park
  park: {
    body: {
      carNumber: { required: true, isString: true },
      slotNumber: { required: true, isString: true },
    },
  },
  // DELETE /parking-lot/unpark/:carNumber
  unpark: {
    params: {
      carNumber: { required: true, isString: true },
    },
  },
};
