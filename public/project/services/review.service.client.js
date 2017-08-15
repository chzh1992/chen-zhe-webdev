(function (){
    angular
        .module('Libri')
        .factory('ReviewService',ReviewService);

    function ReviewService($http){
        var api = {
            findReviewByBookAndUser: findReviewByBookAndUser,
            findReviewsByBook: findReviewsByBook,
            getAverageRating: getAverageRating,
            updateRating: updateRating,
            createRatingReview: createRatingReview,
            getBookReviewNumber: getBookReviewNumber,
            findReviewsByUser: findReviewsByUser,

            createReview: createReview,
            updateReview: updateReview,
            findReviewById: findReviewById,
            deleteReview: deleteReview,
            findAllReviews: findAllReviews
        };
        return api;

        function findReviewByBookAndUser(libriId,userId){
            var url = '/api/project/review/' + libriId+ '/' + userId;
            return $http.get(url);
        }

        function createReview(review){
            var url = '/api/project/review';
            return $http.post(url,review);
        }

        function findReviewsByBook(libriId){
            var url = '/api/project/book/' + libriId + '/review';
            return $http.get(url);
        }

        function getAverageRating(libriId){
            var url = '/api/project/book/' + libriId + '/rating';
            return $http.get(url);
        }

        function updateRating(reviewId,rating){
            var url = '/api/project/review/' + reviewId +'/rating';
            return $http.put(url,{rating: rating});
        }

        function createRatingReview(ratingReview){
            var url = '/api/project/review/rating';
            return $http.post(url,ratingReview);
        }

        function updateReview(reviewId,review){
            var url = '/api/project/review/' + reviewId;
            return $http.put(url,review);
        }

        function getBookReviewNumber(libriId){
            var url = '/api/project/number/review/' + libriId;
            return $http.get(url);
        }

        function findReviewById(reviewId){
            var url = "/api/project/review/" + reviewId;
            return $http.get(url);
        }

        function deleteReview(reviewId){
            var url = "/api/project/review/" + reviewId;
            return $http.delete(url);
        }

        function findAllReviews(){
            var url = "/api/project/review";
            return $http.get(url);
        }

        function findReviewsByUser(userId){
            var url ="/api/project/review/" + userId;
            return $http.get(url);
        }
    }
})();
