class BookModel {

    static addBook(book, books) {
        let newBook = null;
        if (book.title) {
            newBook = {
                id: books.length,
                title: book.title
            };

            books.push(newBook);
        }
    }

    static getBook(req, books) {
        let requestedBook = null;
        books.map((book, i, arr) => {
            if (book.id === +req.params.id) {
                requestedBook = book;
                return;
            }
        });
        return requestedBook;
    }

    static editBook(req, books) {
        books.map((book, i, arr) => {
            if (book.id === +req.params.id) {
                book.title = req.body.title;
                book.author = req.body.author;
                return;
            }
        });
    }

}

module.exports = BookModel;