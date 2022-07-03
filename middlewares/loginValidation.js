const HTTP_BAD_REQUEST_STATUS = 400;

function loginValidation(req, res, next) {
  const { email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(email);

  if (!email || !password) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: 'Email ou senha não informados' });
  }
  if (!isValidEmail) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .json({ message: 'Formato permitido: example@email.com' });
  }
  if (password.length < 6) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .json({ message: 'A senha de deve ter pelo menos 6 caracteres' });
  }

  next();
}

module.exports = { loginValidation };
