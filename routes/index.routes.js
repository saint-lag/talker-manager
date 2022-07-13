const { Router } = require('express');

const router = Router();

const { readFile, writeFile } = require('../helpers/fs');

const FILE_PATH = './talker.json';
const readFileJSON = () => readFile(FILE_PATH);

const {
  HTTP_OK_STATUS,
  HTTP_NOT_FOUND_STATUS,
  HTTP_CREATED_STATUS,
  HTTP_NO_CONTENT_STATUS,
} = require('../utils/http.codes');

const { TOKEN_LENGTH } = require('../utils/magicalNumbers');

const { tokenGenerator } = require('../helpers/tokenGenerator');
const { tokenValidation } = require('../middlewares/tokenValidation');
const { passwordValidation, emailValidation } = require('../middlewares/loginValidation');
const { nameValidation } = require('../middlewares/nameValidation');
const { ageValidation } = require('../middlewares/ageValidation');
const {
  talkValidation,
  watchedAtValidation,
  rateValidation,
  searchTalker,
} = require('../middlewares/talkValidation');

router
  .get('/talker', (_req, res) => {
    const FILE_JSON = readFileJSON();
    if (!FILE_JSON) return res.status(HTTP_OK_STATUS).send([]);

    return res.status(HTTP_OK_STATUS).json(FILE_JSON);
  })
  .get('/talker/search', tokenValidation, (req, res) => {
    const FILE_JSON = readFileJSON();
    const { q } = req.query;
    const query = FILE_JSON.filter((obj) =>
      obj.name.toLowerCase().includes(q.toLowerCase()));
    res.status(HTTP_OK_STATUS).json(query);
  })
  .get('/talker/:id', (req, res) => {
    const FILE_JSON = readFileJSON();
    const { id } = req.params;
    const query = FILE_JSON.find((obj) => obj.id === Number(id));

    if (!query || query === '') {
      return res.status(HTTP_NOT_FOUND_STATUS).json({
        message: 'Pessoa palestrante não encontrada',
      });
    }
    return res.status(HTTP_OK_STATUS).json(query);
  })
  .post('/login', emailValidation, passwordValidation, (_req, res) => {
    const token = tokenGenerator(TOKEN_LENGTH);
    res.status(HTTP_OK_STATUS).json({ token });
  })
  .post(
    '/talker',
    tokenValidation,
    nameValidation,
    ageValidation,
    talkValidation,
    rateValidation,
    watchedAtValidation,
    (req, res) => {
      const FILE_JSON = readFileJSON();
      const { name, age, talk } = req.body;
      const CURRENT_TALKERS_LENGTH = FILE_JSON.length;
      const newObj = {
        id: CURRENT_TALKERS_LENGTH + 1,
        name,
        age,
        talk,
      };
      FILE_JSON.push(newObj);
      const STR_FILE_JSON = JSON.stringify(FILE_JSON);
      writeFile(FILE_PATH, STR_FILE_JSON);
      return res.status(HTTP_CREATED_STATUS).json(newObj);
    },
  )
  .put(
    '/talker/:id',
    tokenValidation,
    nameValidation,
    ageValidation,
    talkValidation,
    rateValidation,
    watchedAtValidation,
    searchTalker,
    (req, res) => {
      const FILE_JSON = readFileJSON();
      const { id } = req.params;
      const { talk, name, age } = req.body;
      const { watchedAt, rate } = talk;
      const index = FILE_JSON.findIndex((obj) => String(obj.id) === id);
      FILE_JSON[index].name = name;
      FILE_JSON[index].age = Number(age);
      FILE_JSON[index].talk = { watchedAt, rate: Number(rate) };
      const STR_FILE_JSON = JSON.stringify(FILE_JSON);
      writeFile(FILE_PATH, STR_FILE_JSON);
      return res.status(HTTP_OK_STATUS).json(FILE_JSON[index]);
    },
  )
  .delete('/talker/:id', tokenValidation, searchTalker, (req, res) => {
    const FILE_JSON = readFileJSON();
    const { id } = req.params;
    const index = FILE_JSON.findIndex((obj) => String(obj.id) === id);
    FILE_JSON.splice(index, 1);
    const STR_FILE_JSON = JSON.stringify(FILE_JSON);
    writeFile(FILE_PATH, STR_FILE_JSON);
    return res.status(HTTP_NO_CONTENT_STATUS).send();
  });

module.exports = { router };
