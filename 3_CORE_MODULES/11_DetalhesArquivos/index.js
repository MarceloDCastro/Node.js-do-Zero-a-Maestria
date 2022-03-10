const fs = require('fs');

fs.stat('arquivo.txt', (error, stats) => {
    if(error) {
        console.log(error);
        return
    }

    console.log('isDirectory? ',stats.isDirectory());
    console.log('isFile? ',stats.isFile());
    console.log('Geral: ',stats);

})