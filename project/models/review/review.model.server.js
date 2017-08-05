var mongoose = require('mongoose');
var reviewSchema = require('./review.schema.server');
var reviewModel = mongoose.model('ProjectReviewModel',reviewSchema);

reviewModel.findReviewByBookAndUser = findReviewByBookAndUser;
reviewModel.createReview = createReview;
reviewModel.findReviewsByBook = findReviewsByBook;

module.exports = reviewModel;

function findReviewByBookAndUser(bookId,userId){
    return reviewModel
        .findOne({
            reviewer: userId,
            onBook: bookId
        });
}

function createReview(review){
    return reviewModel
        .create(review);
}

function findReviewsByBook(bookId){
    return reviewModel
        .find({
            onBook: bookId
        });
}

