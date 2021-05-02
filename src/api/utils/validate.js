const isEmpty = require('./isEmpty');
const { httpStatus } = require('../utils/constants');
const APIError = require('../utils/APIError');

/**
 *
 * Check fieldName input with given validation set
 *
 * @param {string} fieldName - Input field name
 * @param {Object} requirements - Requirements data base on validation given
 * @param {string | number} value - Input value
 */
const checkInput = (fieldName, requirements, value) => {
  const errors = [];
  if (requirements?.required && isEmpty(value)) {
    errors.push(`${fieldName} is required`);
  }

  if (requirements?.isString && typeof value !== 'string') {
    errors.push(`${fieldName} must be string`);
  }

  if (requirements?.array && !isEmpty(value)) {
    const arrayReq = requirements?.array ?? [];
    if (!arrayReq.includes(value)) {
      errors.push(
        `${fieldName} must be ${arrayReq
          .filter((entry) => !isEmpty(entry))
          .join(', ')} only`
      );
    }
  }

  if (errors.length > 0) {
    return { [fieldName]: errors };
  }
};

/**
 * Validate
 *
 * Generate validation errors base on the give validation data
 */
const validate = (data) => {
  return (req, res, next) => {
    try {
      let errorEntries = {};

      const dataEntries = Object.keys(data);

      dataEntries.forEach((dataEntry) => {
        const entries = Object.keys(data[dataEntry]);
        const requestValues = Object.keys(req[dataEntry]);

        entries.forEach((entry) => {
          const errors = checkInput(
            entry,
            data[dataEntry][entry],
            req[dataEntry][entry]
          );

          if (!isEmpty(errors)) {
            errorEntries = { ...errorEntries, ...errors };
          }
        });
      });

      if (!isEmpty(errorEntries)) {
        throw new APIError({
          status: httpStatus.BAD_REQUEST,
          message: 'Validation Error',
          errors: errorEntries,
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = validate;
