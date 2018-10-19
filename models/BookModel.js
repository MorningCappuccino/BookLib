class BookModel {

    static addBook(book) {
        let books = this.books;
        let newBook = null;
        if (book.title) {
            newBook = {
                id: books.length,
                title: book.title,
                author: book.author,
                page_count: book.page_count,
                year: book.year
            };

            books.push(newBook);
        }

        return newBook;
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
        let editedBook = null;

        books.map((book, i, arr) => {
            if (book.id === +req.params.id) {
                book.title = req.body.title;
                book.author = req.body.author;
                book.page_count = req.body.page_count;
                book.year = req.body.year;
                editedBook = book;
            }
        });

        return editedBook;
    }

}

BookModel.books = [
    {
        id: 0,
        title: 'Harry Potter',
        author: 'J. K. Rowling',
        page_count: 283,
        year: 1997
    },
    {
        id: 1,
        title: 'Martin Eden',
        author: 'Jack London',
        page_count: 258,
        year: 1909
    },
    {
        id: 2,
        title: 'Gone with the Wind',
        author: 'Margaret Mitchell',
        page_count: 451,
        year: 1939
    }
];

module.exports = BookModel;