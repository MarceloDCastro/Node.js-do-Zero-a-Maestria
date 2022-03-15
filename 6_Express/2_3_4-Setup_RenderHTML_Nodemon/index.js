const express = require('express');
const app = express();
const port = 3000;

// npm i --save-dev nodemon

const path = require('path');
const basePath = path.resolve();

app.get('/', (req, res) => {
    res.send('Hello World!');
})

// Renderizando HTML
app.get('/home', (req, res) => {
    res.sendFile(basePath + '/renderHTNL.html')
})

app.listen(port, () => console.log('Executando na porta ' + port));