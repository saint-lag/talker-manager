const { HTTP_BAD_REQUEST_STATUS } = require('../utils/http.codes');

const { MIN_AGE } = require('../utils/magicalNumbers');

function ageValidation(req, res, next) {
  const { age } = req.body;

  if (!age) {
    return res
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < MIN_AGE) {
    return res
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
}

module.exports = { ageValidation };
