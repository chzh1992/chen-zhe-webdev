(function (){
    angular
        .module('Libri')
        .controller('BookDetailsController',BookDetailsController);

    function BookDetailsController($routeParams,$sce,BookService,UserService,ReviewService,$route,$anchorScroll){
        var model = this;
        var goodreadsId = $routeParams['goodreadsId'];

        model.wantToRead = wantToRead;
        model.postReview = postReview;
        model.goToReviewForm = goToReviewForm;

        function init(){
            BookService
                .searchBookByGoodreadsId(goodreadsId)
                .then(
                    function (response){
                        model.book = response.data;
                        model.book.reviews_widget = $sce.trustAsHtml(model.book.reviews_widget[0].replace('\n',''));
                        model.book.description = $sce.trustAsHtml(model.book.description[0]);
                        ReviewService
                            .findReviewsByBook(goodreadsId)
                            .then(
                                function (response){
                                    model.book.reviews = response.data;
                                }
                            );
                    }
                );
            getCurrentUserInformation();
        }
        init();

        function getCurrentUserInformation(){
            UserService
                .checkLoggedIn()
                .then(
                    function (response) {
                        model.user = response.data;
                        getUserReview(model.user);
                    });
        }

        function getUserReview(user){
            ReviewService
                .findReviewByBookAndUser(goodreadsId, user._id)
                .then(
                    function (response) {
                        model.currentUserReview = response.data;
                        model.currentUserHasReview = true;
                    },function (err){
                        model.currentUserHasReview = false;
                    });
        }

        function wantToRead(){
            if (model.user){
                UserService
                    .putBookOnBookshelf(model.book,'wantToRead')
                    .then(
                        function (response){}
                    );
            }
        }

        function postReview(){
            model.currentUserReview.reviewer = model.user._id;
            model.currentUserReview.onBook = goodreadsId;
            ReviewService
                .createReview(model.currentUserReview)
                .then(
                    function (response){
                        $route.reload();
                    }
                );
        }

        function goToReviewForm(){
            $anchorScroll('#review');
        }
    }
})();