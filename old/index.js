const cyrillicToTranslit = require('cyrillic-to-translit-js');
const chalk = require('chalk');

const translitText = cyrillicToTranslit().transform('Привет Мир!');

console.log(chalk.red(translitText));
