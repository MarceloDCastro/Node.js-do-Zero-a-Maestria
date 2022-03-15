const express = require('express');
const router = express.Router();
const path = require('path');

const port = 3000;
const basePath = path.resolve();

router.get('/add', (req, res) => {
    res.sendFile(basePath + '/templates/formulario.html')
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log("Buscando pelo usuário " + id)
    res.sendFile(basePath + '/templates/users.html')
})

router.post('/save', (req, res) => {
    console.log('Req Body: ', req.body)
    
    const name = req.body.name;
    const age = req.body.age;
    
    console.log(`O nome do usuário é ${name} e ele tem ${age} anos.`)
     
    res.sendFile(basePath + '/templates/formulario.html')
})

module.exports = router;