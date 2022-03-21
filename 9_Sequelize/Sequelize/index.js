const express = require('express');
const exphbs = require('express-handlebars');
const conn = require('./db/conn');

const User = require('./models/User')
const Address = require('./models/Address');
const { application } = require('express');

const app = express();

// Pegar dados do POST
app.use(express.urlencoded({
    extended: true,
}))
app.use(express.json())

// Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// CSS
app.use(express.static('public'));

// Pages
app.get('/', async (req, res) => {
    const users = await User.findAll({ raw: true });
    res.render('home', {users})
})

app.get('/users/create', (req, res) => {
    res.render('addUser')
})

app.get('/users/edit/:id', async (req,res) => {
    const user = await User.findOne({ include: Address, where: {id: req.params.id} });
    res.render('editUser', { user: user.get({plain: true}) })
})

// GET By ID
app.get('/users/:id', async (req,res) => {
    const user = await User.findOne({ raw: true, where: {id: req.params.id} });
    res.render('userView', { user })
})

// POST
app.post('/users/create', async (req, res) => {
    const name = req.body.name;
    const occupation = req.body.occupation;
    const newsLetter = req.body.newsLetter == 'on';

    await User.create({name, occupation, newsLetter})

    res.redirect('/')
})

// PUT
app.post('/users/edit', async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const occupation = req.body.occupation;
    const newsLetter = req.body.newsLetter == 'on';
    
    await User.update({
        id,
        name,
        occupation,
        newsLetter
    }, { where: { id } })

    res.redirect('/')
})

// DELETE
app.post('/users/delete/:id', async (req,res) => {
    await User.destroy({ where: { id: req.params.id } })
    res.redirect('/')
})

// POST Address
app.post('/address/create', async (req, res) => {
    const UserId = req.body.UserId;
    const street = req.body.street;
    const number = req.body.number;
    const city = req.body.city;

    await Address.create({street, number, city, UserId})

    res.redirect(`/users/edit/${UserId}`)
})

//DELETE Address
app.post('/address/delete', async (req, res) => {
    const id = req.body.id;
    const UserId = req.body.UserId;

    await Address.destroy({
        where: { id }
    })

    res.redirect(`/users/edit/${UserId}`)
})

conn
.sync()
// .sync({ force: true })
.then(() => app.listen(3000))
.catch(err => console.log(err))