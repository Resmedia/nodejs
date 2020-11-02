const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const templating = require('consolidate');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const port = 3000;

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, './views'));

app.use(bodyParser.json());
app.use(cookieParser('%6648Yjjf%$88_io'));

app.get('/',  urlencodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(404);
    count = 0;
    res.render('index', { count });
});

app.all('/news', urlencodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(404);
    let news = [];
    let count = 0;
    let cookieNewsCount = 0;
    request(`https://zsrf.ru/news`, (err, response, html) => {
        if (err) {
            res.send('Что-то пошло не так: ', err);
        } else if (!err && response.statusCode === 200) {
            if (req.body.countNews) {
                res.cookie('newsCount', req.body.countNews)
            }
            const $ = cheerio.load(html);
            const posts = $('section#news').children();
            if(req.cookies.newsCount) {
                cookieNewsCount = req.cookies.newsCount;
            }
            if (posts) {
                posts.map((i, child) => {
                    if (count < (+req.body.countNews || cookieNewsCount || posts.length) && !!$(child).find('h2.title').text()) {
                        news.push({
                            'id': i + 1,
                            'title': $(child).find('h2.title').text(),
                            'description': $(child).find('p.desc').text()
                        });
                    }
                    count += 1;
                });
            }
            res.render('news', { news });
        } else {
            res.sendStatus(404);
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
