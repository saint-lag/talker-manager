// loginValidation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// talkValidation
const YEAR_MONTH_DAY_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const DAY_MONTH_YEAR_REGEX = /^\d{2}\/\d{2}\/\d{4}$/;

module.exports = {
  YEAR_MONTH_DAY_REGEX,
  DAY_MONTH_YEAR_REGEX,
  EMAIL_REGEX,
};
