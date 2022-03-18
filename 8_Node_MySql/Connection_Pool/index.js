const { application } = require('express');
const express = require('express');
const exphbs = require('express-handlebars');
const pool = require('./db/conn');

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

// Home
app.get('/', (req, res) => {
    res.render('home')
})

//GET Books
app.get('/books', (req, res) => {
    pool.query('SELECT * FROM books', (err, data) => {
        if(err) {
            console.log(err);
            return;
        }
    
        res.render('books', { books: data })
    })
})

// GET Books By ID
app.get('/books/:id', (req, res) => {
    const id = req.params.id;
    pool.query(`SELECT * FROM books WHERE id = ${id}`, (err, data) => {
        if(err){
            console.log(err);
            return;
        }
        res.render('book', { book: data[0] })
    })
})

// POST Book
app.post('/books/add', (req, res) => {
    const title = req.body.title;
    const pageQty = req.body.pageQty;

    pool.query(`INSERT INTO books (title, pageQty) values ('${title}', '${pageQty}')`, (err) => {
        if (err) {
            console.log(err);
        }
        
        res.redirect('/');
    });
})

// PUT Book
app.get('/books/edit/:id', (req, res) => {
    const id = req.params.id;
    pool.query(`SELECT * FROM books WHERE id = ${id}`, (err, data) => {
        if(err){
            console.log(err);
            return;
        }
        res.render('editbook', { book: data[0] })
    })
})
app.post('/books/updatebook' , (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const pageQty = req.body.pageQty;
    pool.query(`UPDATE books SET title = '${title}', pageQty = '${pageQty}' WHERE id = ${id}`, (err) => {
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/books');
    })
})

// DELETE Book
app.post('/books/remove/:id', (req, res) => {
    const id = req.params.id;
    pool.query(`DELETE FROM books WHERE id = ${id}`, (err) => {
        if(err){
            console.log(err);
            return;
        }
        res.redirect('/books');
    })
})

app.listen(3000);