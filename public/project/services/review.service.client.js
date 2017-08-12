(function (){
    angular
        .module('Libri')
        .factory('ReviewService',ReviewService);

    function ReviewService($http){
        var api = {
            findReviewByBookAndUser: findReviewByBookAndUser,
            createReview: createReview,
            findReviewsByBook: findReviewsByBook,
            getAverageRating: getAverageRating,
            updateRating: updateRating,
            createRatingReview: createRatingReview,
            updateReview: updateReview
        };
        return api;

        function findReviewByBookAndUser(libriId,userId){
            var url = '/api/review/' + libriId+ '/' + userId;
            return $http.get(url);
        }

        function createReview(review){
            var url = '/api/review/new';
            return $http.post(url,review);
        }

        function findReviewsByBook(libriId){
            var url = '/api/review/' + libriId;
            return $http.get(url);
        }

        function getAverageRating(libriId){

        }

        function updateRating(reviewId,rating){

        }

        function createRatingReview(rating){

        }

        function updateReview(reviewId,review){

        }
    }
})();
