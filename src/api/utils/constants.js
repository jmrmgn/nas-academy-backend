// Http Status
const CREATED = 201;
const NO_CONTENT = 204;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const TOO_MANY_REQUESTS = 429;
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
    BAD_REQUEST,
    NOT_FOUND,
    TOO_MANY_REQUESTS,
    UNPROCESSABLE_ENTITY,
    SERVER_ERROR,
  },
  numberType: {
    [CAR_LABEL]: CAR_VALUE,
    [SLOT_LABEL]: SLOT_VALUE,
    CAR_LABEL,
    SLOT_LABEL,
  },
};
