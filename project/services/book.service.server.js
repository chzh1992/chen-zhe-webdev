var app = require('../../express');
var bookModel = require('../models/book/book.model.server');
var userModel = require('../models/user/user.model.sever');

app.get("/api/search/:searchTerm",findBooksByTerm);
app.get("/api/project/book/:libriId",findBookById);
app.get("/api/project/book/goodreads/:goodreadsId",findBookByGoodreadsId);
app.post("/api/project/book",createBook);
app.post("/api/project/book/goodreads",importGoodreadsBook);
app.get("//api/project/work/:libriId",getWorkInformation);
app.put("/api/project/book/:libriId",updateBook);

function findBooksByTerm(req,res){
    var searchTerm = req.params['searchTerm'];
    searchTerm = searchTerm.split('+')[0];
    bookModel
        .findBooksByTerm(searchTerm)
        .then(
            function (books){
                if (books.length !== 0){
                    res.json(books);
                } else{
                    res.sendStatus(404);
                }
            }
        )
}

function findBookById(req,res){
    var libriId = req.params['libriId'];
    bookModel
        .findBookById(libriId)
        .then(
            function (book){
                res.json(book);
            }
        );
}

function findBookByGoodreadsId(req,res){
    var goodreadsId = req.params['goodreadsId'];
    bookModel
        .findBookByGoodreadsId(goodreadsId)
        .then(
            function (book){
                if (book !== null){
                    res.json(book);
                } else{
                    res.sendStatus(404);
                }
            }
        )
}

function createBook(req,res){
    var book = req.body;
    bookModel
        .createBook(book)
        .then(
            function (book){
                res.json(book);
            }
        );
}

function getWorkInformation(req,res){
    var libriId = req.params['libriId'];
    bookModel
        .findBookById(libriId)
        .then(
            function (book){

            }
        )
}

function importGoodreadsBook(req,res){
    var goodreadsBook = req.body;
    bookModel
        .importGoodreadsBook(req.body)
        .then(
            function (book){
                res.json(book);
            }
        )
}

function updateBook(req,res){
    var libriId = req.params['libriId'];
    var book = req.book;
    bookModel
        .updateBook(libriId,book)
        .then(
            function(doc){
                res.json(200);
            },function (err){
                res.json(502);
            }
        )
}

