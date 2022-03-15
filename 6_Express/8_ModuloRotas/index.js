const express = require('express');
const app = express();
const path = require('path');

const port = 3000;
const basePath = path.resolve();

const usersRouter = require('./users');

// Middleware
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

// Ler body
app.use(
    express.urlencoded({
    extended: true,
    })
);

app.use(express.json());

// Configurando rota
app.use('/users', usersRouter);

app.get('/', (req, res) => {
    res.send('Hello')
})

// Fica por último, se nenhuma das requisições acima forem chamadas, cai nele
app.use((req, res, next) => {
    res.status(404).sendFile(basePath + '/templates/404.html')
})

app.listen(port , () => console.log('Executando em ' + port))