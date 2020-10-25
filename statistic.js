const fs = require('fs');

fs.readFile('logs.txt', 'utf8', function (err, data) {
    if (err) {
        console.log('Ещё не сыграно ни одной игры');
        return;
    }
    const arr = data.split('\n');
    const parties = arr.length - 1;

    let win = 0;
    let loss = 0;
    let wins = 0;
    let losses = 0;
    let i = 0;
    let j = 0;

    for (const key in arr) {
       if (arr.hasOwnProperty(key)) {
           if (arr[key] === 'win') {
               win++;
               i++;
           } else {
               if (i >= wins) {
                   wins = i;
                   i = 0;
               }
               i = 0;
           }
           if (arr[key] === 'loss') {
               loss++;
               j++;
           } else {
               if (j >= losses) {
                   losses = j;
                   j = 0;
               }
               j = 0;
           }
       }
    }

    console.log(`Всего сыграно партий ${parties}`);
    console.log(`Выигранных ${win} партий`);
    console.log(`Проигранных ${loss} партий`);
    console.log(`Соотношение партий: ${win}:${loss}`);
    console.log(`Максимальне число побед подряд ${wins}`);
    console.log(`Максимальне число проигрышей подряд ${losses}`);
});
