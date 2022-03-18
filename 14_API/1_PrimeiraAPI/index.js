const express = require('express');
const app = express();

app.use(express.urlencoded({
    extended: true,
}))

app.use(express.json());

const products = [
    {
        id: 1,
        name: 'Cadeira',
        price: 29.99,
    },
    {
        id: 2,
        name: 'Mesa',
        price: 99.99,
    }
];

let id = 2;

// Endpoints
app.get('/', (req, res) => {
    res.json({
        title: "Hello World!!!",
        message: "Primeiro endpoint criado com sucesso!",
    })
})

app.get('/product', (req, res) => {
    res.status(200).json(products)
})

app.post('/product', (req, res) => {
    const name = req.body.name;
    const price = req.body.price;

    if(!name || !price){
        res.status(422).json({ message: 'Existem campos não informados!' });
        return;
    }

    id++;

    products.push({
        id: id,
        name: req.body.name,
        price: req.body.price
    });

    res.status(201).json({ message: 'Produto cadastrado com sucesso!' })
})

app.put('/product/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const name = req.body.name;
    const price = req.body.price;
    const productIndex = products.findIndex(p => p.id == req.params.id);


    // ERROR
    if(!name || !price){
        res.status(422).json({ message: 'Existem campos não informados!' });
        return;
    }
    if(productIndex == -1){
        res.status(422).json({ message: 'Produto não encontrado!' });
        return;
    }

    products[productIndex] = {
        id: id,
        name: req.body.name,
        price: req.body.price
    }

    res.json({ message: "Produto editado com sucesso!" })
})

app.delete('/product/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id == id);

    if(productIndex == -1){
        res.status(422).json({ message: "Produto não encontrado!" });
        return;
    }

    products.splice(productIndex, 1);
    res.status(200).json({ message: "Produto removido!" })
})

app.listen(3000)