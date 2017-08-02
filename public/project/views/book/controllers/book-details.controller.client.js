(function (){
    angular
        .module('Libri')
        .controller('BookDetailsController',BookDetailsController);

    function BookDetailsController($routeParams,$http,$sce,BookService,UserService,ReviewService){
        var model = this;
        var goodreadsId = $routeParams['goodreadsId'];

        function init(){
            BookService
                .searchBookByGoodreadsId(goodreadsId)
                .then(
                    function (response){
                        model.book = response.data;
                        model.book.reviews_widget = $sce.trustAsHtml(model.book.reviews_widget[0].replace('\n',''));
                        model.book.description = $sce.trustAsHtml(model.book.description[0]);
                    }
                );
            initializeCurrentUserReview();
        }
        init();

        function initializeCurrentUserReview(){
            UserService
                .checkLoggedIn()
                .then(
                    function (response) {
                        var user = response.data;
                        ReviewService
                            .findReviewByGoodreadsIdAndUser(goodreadsId, user._id)
                            .then(
                                function (response) {
                                    model.currentUserHasReview = "yes";
                                    model.currentUserReview = response.data;
                                },
                                function (err){
                                    model.currentUserHasReview = "no";
                                });
                    },
                    function (err){
                        model.currentUserHasReview = "not logged in";
                    });
        }
    }
})();