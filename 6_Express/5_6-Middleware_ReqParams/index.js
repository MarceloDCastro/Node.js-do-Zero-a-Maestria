const express = require('express');
const app = express();
const path = require('path');

const port = 3000;
const basePath = path.resolve();

const checkAuth = (req, res, next) => {
    req.authStatus = true;

    if (req.authStatus){
        console.log('Está logado');
        next();
    } else{
        console.log('Não está logado');
        next();
    }
}

app.use(checkAuth);

app.get('/', (req, res) => {
    res.send('Hello')
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    console.log("Buscando pelo usuário " + id)
    res.sendFile(basePath + '/users.html')
})

app.listen(port , () => console.log('Executando em ' + port))