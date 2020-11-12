const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const templating = require('consolidate');
const express = require('old/express');
const bodyParser = require('body-parser');

const port = 3000;

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.engine('hbs',  templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.use(bodyParser.json());

app.post('/', urlencodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(404);
    let news = [];
    let count = 0;
    request(`https://zsrf.ru/news`, (err, response, html) => {
        if (err) {
            res.send('Что-то пошло не так: ', err);
        } else if (!err && response.statusCode === 200) {
            const $ = cheerio.load(html);
            const posts = $('#news > div');
            posts.each(function (i, elem) {
                if (count < req.body.count) {
                    news.push({
                        'id': i + 1,
                        'title': $(this).find('.title').text(),
                        'description': $(this).find('.desc').text()
                    });
                }
                count += 1;
            });
            res.render('news', { news: news });
        } else {
            res.sendStatus(404);
        }
    });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
