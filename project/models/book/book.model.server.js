var mongoose = require('mongoose');
var bookSchema = require('./book.schema.server');
var bookModel = mongoose.model('ProjectBookModel',bookSchema);

bookModel.findBookById = findBookById;
bookModel.findBookByGoodreadsId = findBookByGoodreadsId;
bookModel.createBook = createBook;

module.exports = bookModel;

function findBookById(bookId){
    return bookModel.findById(bookId);
}

function findBookByGoodreadsId(goodreadsId){
    return bookModel.findOne({'goodreads.id' : goodreadsId});
}

function createBook(goodreadsBook){
    var newBook = {
        goodreads: {
            id: goodreadsBook.id[0]
        }
    };
    return bookModel.create(newBook);
}




