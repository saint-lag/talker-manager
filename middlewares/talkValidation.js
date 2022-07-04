const {
  HTTP_BAD_REQUEST_STATUS,
  HTTP_NOT_FOUND_STATUS,
} = require('../utils/http.codes');
const { RATE_RANGE } = require('../utils/magicalNumbers');
const { DAY_MONTH_YEAR_REGEX } = require('../utils/regex');

const { readFile } = require('../helpers/fs');

const FILE_PATH = './talker.json';
const readFileJSON = () => readFile(FILE_PATH);

const RATE_RANGE_START = RATE_RANGE[0];
const RATE_RANGE_END = RATE_RANGE[RATE_RANGE.length - 1];

const talkValidation = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "talk" é obrigatório' });
  }
  const { rate, watchedAt } = talk;
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
  next();
};

const rateValidation = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;
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
  next();
};
const watchedAtValidation = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  const isWatchedAtValid = DAY_MONTH_YEAR_REGEX.test(watchedAt);
  if (!isWatchedAtValid) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  next();
};
const searchTalker = (req, res, next) => {
    const FILE_JSON = readFileJSON();
    const { id } = req.params;
    const talkerObj = FILE_JSON.find((obj) => obj.id === Number(id));

    if (!talkerObj) {
      return res
        .status(HTTP_NOT_FOUND_STATUS)
        .json({ message: 'Talker não encontrado' });
    }

    next();
};

module.exports = { talkValidation, rateValidation, watchedAtValidation, searchTalker };
