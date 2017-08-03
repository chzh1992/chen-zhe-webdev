var mongoose = require('mongoose');
var bookSchema = require('./book.schema.server');
var bookModel = mongoose.model('ProjectBookModel',bookSchema);

bookModel.findBookById = findBookById;
bookModel.findBookByGoodreadsId = findBookByGoodreadsId;

module.exports = bookModel;

function findBookById(bookId){
    return bookModel.findById(bookId);
}

function findBookByGoodreadsId(goodreadsId){
    return bookModel.findOne({goodreadsId: goodreadsId});
}




