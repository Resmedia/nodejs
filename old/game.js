const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const sideCoin = [["1", "Орел"], ["2", "Решка"]];

function start() {
    console.log('Здраствуйте! Введите 1 - Орел или 2 - Решка, Q - для выхода:');
}

start();

rl.on('line', function (key) {
    const rand = Math.floor(Math.random() * sideCoin.length);
    if (key === 'Q') {
        this.close();
    } else {
        let record;
        if ((key === '1') || (key === '2') || (key === 'Q')) {
            console.log(`Ваш выбор ${key}, Загадано ${sideCoin[rand][0]}`);
            if (key === sideCoin[rand][0]) {
                console.log('Вы выиграли!');
                record = "win\n";
            } else {
                console.log('Вы проиграли!');
                record = "loss\n";
            }
            fs.appendFile('logs.txt', record, function (err) {
                if (err) {
                    throw err;
                }
            });
        } else {
            console.log('Допустимые символы: 1, 2 или Q');
        }
        start();
    }
});
