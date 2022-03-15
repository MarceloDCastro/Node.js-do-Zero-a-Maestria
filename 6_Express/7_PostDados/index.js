const express = require('express');
const app = express();
const path = require('path');

const port = 3000;
const basePath = path.resolve();

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

app.get('/', (req, res) => {
    res.send('Hello')
})

app.get('/users/add', (req, res) => {
    res.sendFile(basePath + '/templates/formulario.html')
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    console.log("Buscando pelo usuário " + id)
    res.sendFile(basePath + '/users.html')
})

app.post('/users/save', (req, res) => {
    console.log('Req Body: ', req.body)
    
    const name = req.body.name;
    const age = req.body.age;
    
    console.log(`O nome do usuário é ${name} e ele tem ${age} anos.`)
     
    res.sendFile(basePath + '/templates/formulario.html')
})

app.listen(port , () => console.log('Executando em ' + port))