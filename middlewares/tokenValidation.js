const { HTTP_UNAUTHORIZED_STATUS } = require('../http.codes');

function tokenValidation(req, res, next) {
  const { authorization } = req.headers;
  
  if (!authorization) {
    return res
      .status(HTTP_UNAUTHORIZED_STATUS)
      .json({ message: 'Token não encontrado' });
  }
  if (!authorization < 16) {
    return res
      .status(HTTP_UNAUTHORIZED_STATUS)
      .json({ message: 'Token inválido' });
  }

  next();
}

module.exports = { tokenValidation };