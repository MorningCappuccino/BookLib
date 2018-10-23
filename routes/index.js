//set DEBUG=test-project:* & npm start
var express = require('express');
var router = express.Router();
var BookController = require('../controllers/book.controller.js');
var deleteBook = require('../tests/deleteBook.js');

const mongoose = require('mongoose');
const Book = require('../models/book');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET all books (json)*/
router.get('/books', BookController.getAllBooks);

/* GET one book by :id */
router.get('/book/:id', BookController.getBookByID);

/* Save book and render list of books */
router.post('/book', BookController.bookAdd);

/* Edit book by :id */
router.patch('/book/:id', BookController.editBook);

/* Delete book */
router.delete('/book/:id', BookController.bookDelete);

/* GET one book by :searchQuery */
router.get('/book', function(req, res, next) {
    let searchQuery = req.query.search;
    let requestedBook = null;

    if (searchQuery) {
        BookController.books.map((book, i, arr) => {
           // todo: elastic search (regexp)
           if (book.title === searchQuery) {
               requestedBook = book;
               return;
           }
        });
        res.json(requestedBook);
    }
});

router.get('/book-list', function(req, res, next) {
    res.render('book-list', {books: BookController.books});
});

/* Render add new book page */
router.get('/book-add', function(req, res, next) {
   res.render('book-add');
});

/* Edit book by :id */
router.get('/book-edit/:id', function(req, res, next) {
    let book = BookController.getBook(req);
    if (book) {
        res.render('book-edit', {book: book});
    } else {
        res.send('book not found');
    }
});

/* Delete book by :id (get method) */
router.get('/book-delete/:id', function(req, res, next) {
    let newBooks = deleteBook(BookController.books, req.params.id);
    res.render('book-list', {books: newBooks});
});

module.exports = router;
