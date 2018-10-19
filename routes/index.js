//set DEBUG=test-project:* & npm start
var express = require('express');
var router = express.Router();
var BookModel = require('../models/BookModel.js');
var deleteBook = require('../tests/deleteBook.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET all books (json)*/
router.get('/books', function(req, res, next) {
   res.json(BookModel.books);
});

/* GET one book by :id */
router.get('/book/:id', function(req, res, next) {
    let requestedBook = BookModel.getBook(req);
    res.json(requestedBook);
});

/* GET one book by :searchQuery */
router.get('/book', function(req, res, next) {
    let searchQuery = req.query.search;
    let requestedBook = null;

    if (searchQuery) {
        BookModel.books.map((book, i, arr) => {
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
    res.render('book-list', {books: BookModel.books});
});

/* Render add new book page */
router.get('/book-add', function(req, res, next) {
   res.render('book-add');
});

/* Save book and render list of books */
router.post('/book', function(req, res, next) {
    let addedBook = BookModel.addBook(req.body);
    // res.render('book-list', {books: BookModel.books});
    res.json({
        status: 'success',
        book: addedBook
    });
});

/* Edit book by :id */
router.get('/book-edit/:id', function(req, res, next) {
    let book = BookModel.getBook(req);
    if (book) {
        res.render('book-edit', {book: book});
    } else {
        res.send('book not found');
    }
});

/* PATCH now working */
router.patch('/book/:id', function(req, res, next) {
    let editedBook = BookModel.editBook(req);
    res.json({
       status: 'success',
       data: BookModel.books
    });
    // res.render('book-list', {books: BookModel.books});
    // res.send('patch');
});

/* But simple is GET for test */
router.delete('/book/:id', function(req, res, next) {
    let newBooks = deleteBook(BookModel.books, req.params.id);
    // res.render('book-list', {books: newBooks});
    res.json({
        status: 'success',
        data: newBooks
    })
});

/* Delete book by :id (get method) */
router.get('/book-delete/:id', function(req, res, next) {
    let newBooks = deleteBook(BookModel.books, req.params.id);
    res.render('book-list', {books: newBooks});
});

module.exports = router;
