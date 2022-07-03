const { Router } = require('express');

const router = Router();

const FILE_PATH = './talker.json';

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;

const TOKEN_LENGTH = 16;

const { readFile } = require('../helpers/fs');
const { tokenGenerator } = require('../helpers/tokenGenerator');
const { loginValidation } = require('../middlewares/loginValidation');

router
  .get('/talker', (_req, res) => {
    const parsedFile = readFile(FILE_PATH);

    if (!parsedFile) return res.status(HTTP_OK_STATUS).send([]);

    return res.status(HTTP_OK_STATUS).json(parsedFile);
  })
  .get('/talker/:id', (req, res) => {
    const parsedFile = readFile(FILE_PATH);

    const { id } = req.params;
    const query = parsedFile.find((obj) => obj.id === Number(id));

    if (!query || query === '') {
      return res.status(HTTP_NOT_FOUND_STATUS).json({
        message: 'Pessoa palestrante não encontrada',
      });
    }
    return res.status(HTTP_OK_STATUS).json(query);
  })
  .post('/login', loginValidation, (_req, res) => {
    const token = tokenGenerator(TOKEN_LENGTH);
    res.status(HTTP_OK_STATUS).json({ token });
  });

module.exports = { router };
