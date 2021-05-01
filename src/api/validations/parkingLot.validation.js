module.exports = {
  // POST /parking-lot/park
  park: {
    body: {
      carNumber: { required: true },
      slotNumber: { required: true },
    },
  },
};
