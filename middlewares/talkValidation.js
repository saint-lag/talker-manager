/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
const { HTTP_BAD_REQUEST_STATUS } = require('../utils/http.codes');
const { RATE_RANGE } = require('../utils/magicalNumbers');
const { DAY_MONTH_YEAR_REGEX } = require('../utils/regex');

const RATE_RANGE_START = RATE_RANGE[0];
const RATE_RANGE_END = RATE_RANGE[RATE_RANGE.length - 1];

function talkValidation(req, res, next) {
  const { talk } = req.body;
  if (!talk) {
    return res
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "talk" é obrigatório' });
  }
  const { watchedAt, rate } = talk;
  if (!watchedAt) {
    return res
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!rate) {
    return res
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "rate" é obrigatório' });
  }
  if (Number.isNaN(rate)) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  if (rate < RATE_RANGE_START || rate > RATE_RANGE_END) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  const isWatchedAtValid = DAY_MONTH_YEAR_REGEX.test(watchedAt);
  if (!isWatchedAtValid) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  next();
}

module.exports = { talkValidation };
