/* eslint-disable max-lines-per-function */
const { HTTP_BAD_REQUEST_STATUS } = require('../http.codes');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function loginValidation(req, res, next) {
  const { email, password } = req.body;
  const isValidEmail = emailRegex.test(email);

  if (!email) {
    return res
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "email" é obrigatório' });
  }
  if (!password) {
    return res
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "password" é obrigatório' });
  }
  if (!isValidEmail) {
    return res
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (password.length < 6) {
    return res
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
}

module.exports = { loginValidation };
