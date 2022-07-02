const { Router } = require('express');

const router = Router();

const FILE_PATH = './talker.json';

const HTTP_OK_STATUS = 200;

const { readFile } = require('../helpers/fs');

router.get('/talker', (_req, res) => {
  const parsedFile = readFile(FILE_PATH);

  if (!parsedFile) return res.status(HTTP_OK_STATUS).send([]);

  return res.status(HTTP_OK_STATUS).json(parsedFile); 
});

module.exports = { router };