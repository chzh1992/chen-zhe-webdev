(function (){
    angular
        .module('Libri')
        .factory('ReviewService',ReviewService);

    function ReviewService($http){
        var api = {
            findReviewByBookAndUser: findReviewByBookAndUser,
            createReview: createReview,
            findReviewsByBook: findReviewsByBook
        };
        return api;

        function findReviewByBookAndUser(bookId,userId){
            var url = '/api/review/' + bookId+ '/' + userId;
            return $http.get(url);
        }

        function createReview(review){
            var url = '/api/review/new';
            return $http.post(url,review);
        }

        function findReviewsByBook(bookId){
            var url = '/api/review/' + bookId;
            return $http.get(url);
        }
    }
})();
