//import ansi from 'ansi' //ES module //ADM

const ansi = require('ansi'); //Common JS
const User = require('./User');

const cursor = ansi(process.stdout);

cursor.white().bg.green().write('Test message!').reset().bg.reset().write('\n');

console.log("Hello!");
console.log(User.data());

