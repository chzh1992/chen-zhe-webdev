var app = require('../../express');
var reviewModel = require('../models/review/review.model.server');

app.get("/api/project/review/:libriId/:userId",findReviewByBookAndUser);
app.post("/api/project/review",createReview);
app.get("/api/project/book/:libriId/review",findReviewsByBook);
app.get("/api/project/review/:ibriId/:userId",findReviewByBookAndUser);
app.get("/api/project/book/:libriId/rating",getAverageRating);
app.put("/api/project/review/:reviewId/rating",updateRating);
app.post("/api/project/review/rating",createRatingReview);
app.put("/api/project/review/:reviewId",updateReview);
app.get("/api/project/number/review/:libriId",getBookReviewNumber);

function findReviewByBookAndUser(req,res){
    var libriId = req.params['libriId'];
    var userId = req.params['userId'];
    reviewModel
        .findReviewByBookAndUser(libriId,userId)
        .then(
            function (review){
                if (review !== null){
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
    var libriId = req.params['libriId'];
    reviewModel
        .findReviewsByBook(libriId)
        .then(
            function (reviews){
                if (reviews.length > 0){
                    res.json(reviews);
                } else {
                    res.sendStatus(404);
                }

            }
        );
}

function getAverageRating(req,res){
    var libriId = req.params['libriId'];
    reviewModel
        .findReviewsByBook(libriId)
        .then(
            function (reviews){
                res.json({rating: getAverageRatingFromReviews(reviews)});
            }
        )
}

function getAverageRatingFromReviews(reviews){
    var ratingNumber = 0;
    var totalScore = 0;
    for (var review in reviews){
        if (reviews[review].rating){
            totalScore += reviews[review].rating;
            ratingNumber += 1;
        }
    }
    return ratingNumber == 0 ? 0 : totalScore/ratingNumber;
}

function updateRating(req,res){
    var reviewId = req.params['reviewId'];
    var rating = req.body.rating;
    reviewModel
        .updateRating(reviewId,rating)
        .then(
            function (doc){
                res.sendStatus(200);
            }
        );
}

function createRatingReview(req,res){
    var ratingReview = req.body;
    reviewModel
        .createRatingReview(ratingReview)
        .then(
            function (review){
                res.json(review);
            }
        );
}

function updateReview(req,res){
    var reviewId = req.params['reviewId'];
    var review = req.body;
    reviewModel
        .updateReview(reviewId,review)
        .then(
            function (doc){
                res.sendStatus(200);
            }
        );
}

function getBookReviewNumber(req,res){
    var libriId = req.params['libriId'];
    reviewModel
        .getBookReviewNumber(libriId)
        .then(
            function (count){
                res.json({count: count});
            },function (err){
                res.sendStatus(502);
            }
        )

}