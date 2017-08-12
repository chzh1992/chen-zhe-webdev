(function (){
    angular
        .module('Libri')
        .controller('BookDetailsController',BookDetailsController);

    function BookDetailsController($routeParams,$sce,BookService,GoodreadsService,UserService,ReviewService,$location,$anchorScroll){
        var model = this;

        var goodreadsId = $routeParams['goodreadsId'];
        var libriId = $routeParams['libriId'];

        model.putBookOnBookshelf = putBookOnBookshelf;
        model.postReview = postReview;
        model.goToReview = goToReview;
        model.getSearchText = getSearchText;
        model.getLibriRating = getLibriRating;
        model.updateReview = updateReview;
        model.importGoodreadsBook = importGoodreadsBook;
        model.updateRating = updateRating;
        model.claimThisBook = claimThisBook;
        model.trustThisContent = trustThisContent;
        model.logout = logout;

        function init(){
            if (goodreadsId){
                GoodreadsService
                    .searchGoodreadsById(goodreadsId)
                    .then(
                        function (response) {
                            model.book = response.data;
                            model.isCollapsed = true;
                        }
                    );
            } else if(libriId){
                BookService
                    .findBookById(libriId)
                    .then(function (response){
                        model.book = response.data;
                    });
            }
            getCurrentUserInformation();
            model.showReviewEditor = false;
        }
        init();

        function getCurrentUserInformation(){
            UserService
                .checkLoggedIn()
                .then(
                    function (response) {
                        model.user = response.data;
                        if (goodreadsId){
                            BookService
                                .findBookByGoodreadsId(goodreadsId)
                                .then(
                                    function (response){
                                        model.libriId = response.data._id;
                                        getBookshelfPart();
                                        getUserReview();
                                        getLibriReviews();
                                    },function (error){
                                        model.libriId = '-1';
                                        getBookshelfPart();
                                        getUserReview();
                                        getLibriReviews();
                                    }
                                )
                        } else if (libriId){
                            model.libriId = libriId;
                            getBookshelfPart();
                            getUserReview();
                            getLibriReviews();
                        }

                    });
        }

        function getUserReview(){
            ReviewService
                .findReviewByBookAndUser(model.libriId, model.user._id)
                .then(
                    function (response) {
                        model.currentUserReview = response.data;
                        model.currentUserHasReview = true;
                    },function (err){
                        model.currentUserHasReview = false;
                    });
        }


        function getBookshelfPart(){
            if (model.user.bookshelf.wantToRead.indexOf(model.libriId) > -1){
                model.bookshelfPart = 'Want to Read';
            } else if(model.user.bookshelf.reading.indexOf(model.libriId) > -1){
                model.bookshelfPart = 'Reading';
            } else if(model.user.bookshelf.haveRead.indexOf(model.libriId) > -1){
                model.bookshelfPart = 'Have read';
            } else{
                model.bookshelfPart = '-1';
            }
        }

        function getLibriReviews(){
            ReviewService
                .findReviewsByBook(model.libriId)
                .then(
                    function (response){
                        model.book.reviews = response.data;
                        for (var review in model.book.reviews){
                            review.content = trustThisContent(review.content);
                        }
                    }
                )
        }

        function getLibriRating(){
            return ReviewService
                .getAverageRating(model.libriId)
                .then(
                    function (response) {
                        return response.data;
                    }
                )
        }

        function postReview(){
            model.currentUserReview.reviewer = model.user._id;
            if (model.libriId === '-1'){
                importGoodreadsBook();
                model.currentUserReview.onBook = model.libriId;
            } else{
                model.currentUserReview.onBook = model.libriId;
            }
            ReviewService
                .createReview(model.currentUserReview)
                .then(
                    function (response){
                        model.showReviewEditor = false;
                        model.currentUserHasReview = true;
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

        function importGoodreadsBook(){
            BookService
                .createBook(model.book)
                .then(
                    function (response){
                        model.libriId = response.data._id;
                    }
                );
        }

        function updateRating(){
            if (model.currentUserHasReview){
                ReviewService
                    .updateRating(model.currentUserReview._id,model.currentUserReview.rating)
                    .then(
                        function (response){
                            model.ratingMessage = "saved!"
                        }
                    );
            } else{
                ReviewService
                    .createRatingReview(model.currentUserReview.rating)
                    .then(
                        function (response){
                            model.ratingMessage = "saved!"
                        }
                    )
            }
        }

        function updateReview(){
            ReviewService
                .updateReview(model.currentUserReview._id,model.currentUserReview)
                .then(
                    function (response){
                        model.currentUserReview = response.data;
                        model.showReviewEditor = false;
                    }
                )
        }

        function claimThisBook(){
            if (model.libriId === '-1'){
                importGoodreadsBook();
                UserService
                    .claimBook(model.libriId)
                    .then();
            } else{
                UserService
                    .claimBook(model.libriId)
                    .then();
            }
        }

        function putBookOnBookshelf(bookshelfPart){
            if (model.libriId === '-1'){
                importGoodreadsBook();
                UserService
                    .putBookOnBookshelf(model.libriId,bookshelfPart)
                    .then(
                        function (response){
                            if (bookshelfPart === 'WANTTOREAD'){
                                model.bookshelfPart = 'Want to Read';
                            } else if(bookshelfPart === 'READING'){
                                model.bookshelfPart = 'Reading';
                            } else if(bookshelfPart === 'HAVEREAD'){
                                model.bookshelfPart = 'Have read';
                            } else{
                                model.bookshelfPart = '-1';
                            }
                        }
                    );
            }
        }

        function trustThisContent(html){
            return $sce.trustAsHtml(html);
        }

        function logout(){
            UserService
                .logout()
                .then(
                    function (response){
                        $location.url('/');
                    }
                );
        }
    }
})();