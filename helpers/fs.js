const fsp = require('fs').promises;
const fs = require('fs');

const readFile = (filePath) => JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' })); 

const writeFile = (str) => fs.writeFile('../talker', str);

module.exports = { readFile, writeFile };