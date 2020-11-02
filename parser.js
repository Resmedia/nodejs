const request = require('request');
const cheerio = require('cheerio');

request('https://zsrf.ru/', (err, response, body) => {
  try {
    if (response.statusCode === 200) {
      const $ = cheerio.load(body);
      const news = $('.scroll-news').slice(0, 4).contents().text();
      console.log(`Лента новостей:${news.replace(/\s+/g, ' ').trim()}`);
    }
  } catch (e) {
    console.log(e)
  }
});