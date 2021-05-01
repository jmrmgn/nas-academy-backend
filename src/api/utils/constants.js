// Http Status
const CREATED = 201;
const NO_CONTENT = 204;
const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;
const SERVER_ERROR = 500;

// Number Type
const CAR_LABEL = 'car-number';
const CAR_VALUE = 'carNumber';
const SLOT_LABEL = 'slot-number';
const SLOT_VALUE = 'slotNumber';

module.exports = {
  httpStatus: {
    CREATED,
    NO_CONTENT,
    NOT_FOUND,
    UNPROCESSABLE_ENTITY,
    SERVER_ERROR,
  },
  numberType: {
    [CAR_LABEL]: CAR_VALUE,
    [SLOT_LABEL]: SLOT_VALUE,
  },
};
