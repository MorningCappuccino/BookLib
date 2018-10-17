class BookModel {

    static addBook(book) {
        let books = this.books;
        let newBook = null;
        if (book.title) {
            newBook = {
                id: books.length,
                title: book.title,
                author: book.author
            };

            books.push(newBook);
        }
    }

    static getBook(req) {
        let books = this.books;
        let requestedBook = null;
        books.map((book, i, arr) => {
            if (book.id === +req.params.id) {
                requestedBook = book;
                return;
            }
        });
        return requestedBook;
    }

    static editBook(req) {
        let books = this.books;
        books.map((book, i, arr) => {
            if (book.id === +req.params.id) {
                book.title = req.body.title;
                book.author = req.body.author;
                return;
            }
        });
    }

}

BookModel.books = [
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

module.exports = BookModel;