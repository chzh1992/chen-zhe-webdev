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
            var url = '/api/project/rating';
            return $http.put(url,rating);
        }

        function createRatingReview(libriId,rating){
            var url = '/api/project/rating';
            return $http.post(url,rating);
        }

        function updateReview(reviewId,review){
            var url = '/api/project/review/' + reviewId;
            return $http.put(url,review);
        }
    }
})();
