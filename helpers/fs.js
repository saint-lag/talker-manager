const fsp = require('fs').promises;
const fs = require('fs');

const readFile = (filePath) => JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' })); 

const writeFile = (filePath, str) => fsp.writeFile(filePath, str);

module.exports = { readFile, writeFile };