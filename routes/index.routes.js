const { Router } = require('express');

const router = Router();

const { readFile, writeFile } = require('../helpers/fs');

const FILE_PATH = './talker.json';
const FILE_JSON = readFile(FILE_PATH);

const {
  HTTP_OK_STATUS,
  HTTP_NOT_FOUND_STATUS,
  HTTP_CREATED_STATUS,
} = require('../utils/http.codes');

const { TOKEN_LENGTH } = require('../utils/magicalNumbers');

const { tokenGenerator } = require('../helpers/tokenGenerator');
const { tokenValidation } = require('../middlewares/tokenValidation');
const { loginValidation } = require('../middlewares/loginValidation');
const { nameValidation } = require('../middlewares/nameValidation');
const { ageValidation } = require('../middlewares/ageValidation');
const { talkValidation } = require('../middlewares/talkValidation');

router
  .get('/talker', (_req, res) => {
    if (!FILE_JSON) return res.status(HTTP_OK_STATUS).send([]);

    return res.status(HTTP_OK_STATUS).json(FILE_JSON);
  })
  .get('/talker/:id', (req, res) => {
    const { id } = req.params;
    const query = FILE_JSON.find((obj) => obj.id === Number(id));

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
  })
  .post(
    '/talker',
    tokenValidation,
    nameValidation,
    ageValidation,
    talkValidation,
    (req, res) => {
      const { name, age, talk } = req.body;
      const { watchedAt, rate } = talk;
      const CURRENT_TALKERS_LENGTH = FILE_JSON.length;
      const newObj = {
        id: CURRENT_TALKERS_LENGTH + 1,
        name,
        age,
        talk: {
          watchedAt,
          rate,
        },
      };
      FILE_JSON.push(newObj);
      const STR_FILE_JSON = JSON.stringify(FILE_JSON); 
      writeFile(FILE_PATH, STR_FILE_JSON);

      return res.status(HTTP_CREATED_STATUS).json(newObj);
    },
  ); 

module.exports = { router };
