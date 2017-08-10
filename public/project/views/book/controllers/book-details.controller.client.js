(function (){
    angular
        .module('Libri')
        .controller('BookDetailsController',BookDetailsController);

    function BookDetailsController($routeParams,$sce,BookService,GoodreadsService,UserService,ReviewService,$route,$anchorScroll){
        var model = this;

        model.putBookOnBookshelf = putBookOnBookshelf;
        model.postReview = postReview;
        model.goToReview = goToReview;
        model.getSearchText = getSearchText;
        model.isImported = isImported;
        model.getLibriRating = getLibriRating;
        model.viewLibriBook = viewLibriBook;
        model.importGoodreadsBook = importGoodreadsBook;
        model.updateRating = updateRating;
        model.claimThisBook = claimThisBook;

        function init(){
            if ($routeParams['goodreadsId']){
                var goodreadsId = $routeParams['goodreadsId'];
                GoodreadsService
                    .searchGoodreadsById(goodreadsId)
                    .then(
                        function (response) {
                            model.book = response.data;
                            model.book.description = $sce.trustAsHtml(model.book.description);
                            model.book.reviews_widget = $sce.trustAsHtml(model.book.reviews_widget);
                            model.isCollapsed = true;
                        }
                    );
            } else if($routeParams['libriId']){
                var libriId = $routeParams['libriId'];
                BookService
                    .findBookById(libriId)
                    .then(function (response){
                        model.book = response.data;
                    });
            }
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

        function goToReview(){
            $anchorScroll('userReview');
        }

        function getSearchText(){
            if (model.searchText){
                return model.searchText.replace(/\s/g,'+');
            }
        }

        function isImported(){

        }

        function getLibriRating(){

        }

        function viewLibriBook(){

        }

        function importGoodreadsBook(){

        }

        function updateRating(){

        }

        function claimThisBook(){

        }

        function putBookOnBookshelf(bookshelfPart){

        }
    }
})();