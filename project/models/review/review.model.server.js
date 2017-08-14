var mongoose = require('mongoose');
var reviewSchema = require('./review.schema.server');
var reviewModel = mongoose.model('ProjectReviewModel',reviewSchema);

reviewModel.findReviewByBookAndUser = findReviewByBookAndUser;
reviewModel.createReview = createReview;
reviewModel.findReviewsByBook = findReviewsByBook;
reviewModel.findReviewsByUser = findReviewsByUser;
reviewModel.updateRating = updateRating;
reviewModel.createRatingReview = createRatingReview;
reviewModel.updateReview = updateReview;
reviewModel.getBookReviewNumber = getBookReviewNumber;
reviewModel.findReviewById = findReviewById;
reviewModel.deleteReview = deleteReview;

module.exports = reviewModel;

function findReviewByBookAndUser(bookId,userId){
    return reviewModel
        .findOne({
            'reviewer._id': userId,
            onBook: bookId
        });
}

function createReview(review){
    return reviewModel
        .create(review);
}

function findReviewsByBook(libriId){
    return reviewModel.find({onBook: libriId});
}

function findReviewsByUser(userId){
    return reviewModel.find({'reviewer._id': userId});
}

function updateRating(reviewId,rating){
    return reviewModel
        .findById(reviewId)
        .then(
            function (review){
                review.rating = rating;
                return review.save()
            }
        );
}

function createRatingReview(ratingReview){
    return reviewModel.create(ratingReview);
}

function updateReview(reviewId,review){
    return reviewModel
        .update({_id: reviewId},{
        $set : {
            rating: review.rating,
            content: review.content,
            dateUpdated: Date.now()
        }
        });
}

function getBookReviewNumber(libriId){
    return reviewModel.count({onBook: libriId});
}

function findReviewById(reviewId){
    return reviewModel.findById(reviewId);
}

function deleteReview(reviewId){
    return reviewModel.remove({_id: reviewId});
}
