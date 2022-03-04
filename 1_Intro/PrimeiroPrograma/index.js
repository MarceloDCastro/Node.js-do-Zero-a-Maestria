console.log('Hello World Node!')

const fs = require('fs') // importando módulo File System

fs.readFile('arquivo.txt', 'utf-8', (error, data) => {
    if (error){
        console.log(error);
    } else {
        console.log(data);
    }
})

