var mongoose = require('mongoose');
var bookSchema = require('./book.schema.server');
var bookModel = mongoose.model('ProjectBookModel',bookSchema);

bookModel.findBookById = findBookById;
bookModel.findBookByGoodreadsId = findBookByGoodreadsId;
bookModel.createBook = createBook;
bookModel.findBooksByTerm = findBooksByTerm;
bookModel.importGoodreadsBook = importGoodreadsBook;
bookModel.updateBook = updateBook;
bookModel.adminSearch = adminSearch;
bookModel.deleteBook = deleteBook;

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

function adminSearch(searchText){
    return bookModel.find({ $or :[
        {_id: searchText},
        {title: {'$regex' : searchText}},
        {author: {'$regex' : searchText}}
    ]});
}

function deleteBook(libriId){
    return bookModel.remove({_id: libriId});
}


