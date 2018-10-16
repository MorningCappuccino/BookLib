function deleteBook(books, id) {
    let booksX = books;
    let res = null;

    booksX.map((book, i, arr) => {
        if (book.id === +id) {
            arr.splice(i, 1);
            res = changeIDs(booksX, i);
        }
    });

    return res;
}

function changeIDs(booksX, deletedIndex) {
    // console.log(deletedIndex);
    for (let i = deletedIndex; i < booksX.length; i++) {
        booksX[i].id -= 1;
    }

    return booksX;
}

module.exports = deleteBook;
// module.exports = booksX;