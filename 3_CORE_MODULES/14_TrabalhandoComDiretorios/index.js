const fs = require('fs');

if(!fs.existsSync('./novapasta')){
    fs.mkdirSync('./novapasta');
    console.log("Repositório criado!")
} else {
    console.log("Repositório já existe!")
}