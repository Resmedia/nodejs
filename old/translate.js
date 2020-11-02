const readLine = require('readline');
const translate = require('old/translate');

const catcher = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

translate.engine = 'google';
translate.key = 'Your key!';

console.log('Enter in Russian some message: ');

try {
  catcher.on('line', async (text) => {
    const textTranslate = await translate(text, { from: 'ru', to: 'en' });
    console.log(`Your translation: ${textTranslate}`)
  })
} catch (e) {
  console.log(e)
}
