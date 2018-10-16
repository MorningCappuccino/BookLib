//set DEBUG=test-project:* & npm start
var express = require('express');
var router = express.Router();
var BookModel = require('../models/BookModel.js');
var deleteBook = require('../jest/deleteBook.js');

const books = [
    {
        id: 0,
        title: 'Harry Potter',
        author: 'J. K. Rowling'
    },
    {
        id: 1,
        title: 'Martin Eden',
        author: 'Jack London'
    },
    {
        id: 2,
        title: 'Gone with the Wind',
        author: 'Margaret Mitchell'
    }
];

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET all books (json)*/
router.get('/books', function(req, res, next) {
   res.json(books);
});

/* GET one book by :id */
router.get('/book/:id', function(req, res, next) {
    let requestedBook = null;
    books.map((book, i, arr) => {
        if (book.id === +req.params.id) {
            requestedBook = book;
            return;
        }
    });
    res.json(requestedBook);
});

/* GET one book by :searchQuery */
router.get('/book', function(req, res, next) {
    let searchQuery = req.query.search;
    let requestedBook = null;

    if (searchQuery) {
        books.map((book, i, arr) => {
           // todo: elastic search (regexp)
           if (book.title === searchQuery) {
               requestedBook = book;
               return;
           }
        });
        res.json(requestedBook);
    }
});

//todo: render book list
router.get('/book-list', function(req, res, next) {
    res.render('book-list', {books: books});
});

/* Render add new book page */
router.get('/book-add', function(req, res, next) {
   res.render('book-add');
});

/* Save book and render list of books */
router.post('/book-save', function(req, res, next) {
    BookModel.addBook(req.body, books);
    res.render('book-list', {books: books});
});

/* Edit book by :id */
router.get('/book-edit/:id', function(req, res, next) {
    let book = BookModel.getBook(req, books);
    if (book) {
        res.render('book-edit', {book: book});
    } else {
        res.send('book not found');
    }
});

/* PATCH not working */
router.patch('/book-save/:id', function(req, res, next) {
    BookModel.editBook(req, books);
    res.render('book-list', {books: books});
    // res.send('patch');
});

/* But simple is GET --> */
router.delete('/book/:id', function(req, res, next) {
    res.send('patch');
});

/* Delete book by :id (get method) */
router.get('/book-delete/:id', function(req, res, next) {
    let newBooks = deleteBook(books, req.params.id);
    res.render('book-list', {books: newBooks});
    // res.send('delete');
});

module.exports = router;
