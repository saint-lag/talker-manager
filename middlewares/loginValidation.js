const { HTTP_BAD_REQUEST_STATUS } = require('../utils/http.codes');

const { EMAIL_REGEX } = require('../utils/regex');

const emailValidation = (req, res, next) => {
  const { email } = req.body;
  
  if (!email) {
    return res
    .status(HTTP_BAD_REQUEST_STATUS)
    .json({ message: 'O campo "email" é obrigatório' });
  }
  const isValidEmail = EMAIL_REGEX.test(email);
  if (!isValidEmail) {
    return res
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const passwordValidation = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

module.exports = { emailValidation, passwordValidation };
