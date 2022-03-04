console.log('Hello World Node!')

const fs = require('fs') // importando módulo File System

fs.readFile('arquivo.txt', 'utf-8', (error, data) => {
    if (error){
        console.log(error);
    } else {
        console.log(data);
    }
})

const a = 120;
const b = 180;

console.log(`${a} + ${b} = ${a+b}`);

function soma (a,b){
    return a+b;
}

console.log(soma(120,180));

