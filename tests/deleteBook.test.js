const deleteBook = require('./deleteBook.js');

const books = [
    {
        id: 0,
        title: 'Harry Potter'
    },
    {
        id: 1,
        title: 'Martin Eden'
    },
    {
        id: 2,
        title: 'Gone with the Wind'
    }
];

describe('deleteBook', () => {
    it('should delete and correct ids', () => {
        const delIndex = 0;
        const res = deleteBook(books, delIndex);
        expect(res[delIndex].id).toEqual(0);
        expect(res[delIndex].title).toEqual('Martin Eden');
    });
});