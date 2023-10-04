const {nanoid} = require('nanoid');
const books = require('./books')
const addBooksHandler = (request, h) => {
    const {name, year, author, summary, publisher, pageCount, readPage,reading} = request.payload;


    const id = nanoid(20);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook  = {
        name,year,author,summary,publisher,pageCount,readPage,reading,id,finished,insertedAt,updatedAt,
    };

    books.push(newBook)

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (name) {
        const response = h.response ({
            status: 'success',
            message: 'Buku berhasil disimpan',
            data: {
                bookId:id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Moho isi nama buku',
    });
    response.code(400);
    return response;
};

module.exports = {addBooksHandler,}