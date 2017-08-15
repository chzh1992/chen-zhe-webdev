var mongoose = require('mongoose');
var bookSchema = require('./book.schema.server');
var bookModel = mongoose.model('ProjectBookModel',bookSchema);

bookModel.findBookByGoodreadsId = findBookByGoodreadsId;
bookModel.findBooksByTerm = findBooksByTerm;
bookModel.importGoodreadsBook = importGoodreadsBook;

bookModel.findBookById = findBookById;
bookModel.createBook = createBook;
bookModel.updateBook = updateBook;
bookModel.deleteBook = deleteBook;
bookModel.findAllBooks = findAllBooks;

module.exports = bookModel;

function findBookById(bookId){
    return bookModel.findById(bookId);
}

function findBookByGoodreadsId(goodreadsId){
    return bookModel.findOne({'goodreadsId' : goodreadsId});
}

function createBook(book){
    return bookModel.create(book);
}

function findBooksByTerm(searchTerm){
    return bookModel.find({'title': {'$regex' : searchTerm}});
}

function importGoodreadsBook(goodreadsBook){
    var book = goodreadsBook;
    book.goodreadsId = goodreadsBook.id;
    delete book.average_rating;
    return bookModel.create(book);
}

function updateBook(libriId,book){
    return bookModel.update({_id: libriId},book);
}


function deleteBook(libriId){
    return bookModel.remove({_id: libriId});
}

function findAllBooks(){
    return bookModel.find();
}


