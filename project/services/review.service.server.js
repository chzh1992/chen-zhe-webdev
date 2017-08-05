var app = require('../../express');
var reviewModel = require('../models/review/review.model.server');

app.get("/api/review/:bookId/:userId",findReviewByBookAndUser);
app.post("/api/review/new",createReview);
app.get("/api/review/:bookId",findReviewsByBook);

function findReviewByBookAndUser(req,res){
    var bookId = req.params['bookId'];
    var userId = req.params['userId'];
    reviewModel
        .findReviewByBookAndUser(bookId,userId)
        .then(
            function (review){
                if (review){
                    res.json(review);
                } else{
                    res.sendStatus(404);
                }
            },function (err){
                res.sendStatus(502);
            }
        )
}

function createReview(req,res){
    var review = req.body;
    reviewModel
        .createReview(review)
        .then(
            function(review){
                res.sendStatus(200);
            },function(review){
                res.sendStatus(502);
            }
        )
}

function findReviewsByBook(req,res){
    var bookId = req.params['bookId'];
    reviewModel
        .findReviewsByBook(bookId)
        .then(
            function (reviews){
                res.json(reviews);
            }
        );
}