const fs = require('fs');

fs.unlink('logs.txt', function (err) {
    if (err) {
        console.log('Ещё не сыграно ни одной игры');
    } else {
        console.log('Файл успешно очищен');
    }
});
