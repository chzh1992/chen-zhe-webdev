(function (){
    angular
        .module('Libri')
        .controller('LibriBookDetailsController',LibriBookDetailsController);

    function LibriBookDetailsController($routeParams,$sce,BookService,UserService,ReviewService,$route,$location,$anchorScroll) {
        var model = this;

        var goodreadsId = $routeParams['goodreadsId'];
        var libriId = $routeParams['libriId'];

        model.putBookOnBookshelf = putBookOnBookshelf;
        model.postReview = postReview;
        model.goToReview = goToReview;
        model.getSearchText = getSearchText;
        model.updateReview = updateReview;
        model.updateRating = updateRating;
        model.claimThisBook = claimThisBook;
        model.trustThisContent = trustThisContent;
        model.logout = logout;

        function init() {
            BookService
                .findBookById(libriId)
                .then(function (response) {
                    model.book = response.data;
                    getCurrentUserInformation();
                    getLibriReviews();
                });
            model.showReviewEditor = false;
        }
        init();

        function getCurrentUserInformation() {
            UserService
                .checkLoggedIn()
                .then(
                    function (response) {
                        model.user = response.data;
                        model.book.isClaimed = model.user.authoredBooks.indexOf(model.book._id) > -1;
                        getBookshelfPart();
                        getUserReview();
                    },function (err){
                    }
                );
        }

        function getUserReview() {
            ReviewService
                .findReviewByBookAndUser(model.book._id, model.user._id)
                .then(
                    function (response) {
                        model.currentUserReview = response.data;
                        model.currentUserHasReview = true;
                    }, function (err) {
                        model.currentUserHasReview = false;
                    });
        }


        function getBookshelfPart() {
            if (model.user.bookshelf.wantToRead.indexOf(model.book._id) > -1) {
                model.bookshelfPart = 'Want to Read';
            } else if (model.user.bookshelf.reading.indexOf(model.book._id) > -1) {
                model.bookshelfPart = 'Reading';
            } else if (model.user.bookshelf.haveRead.indexOf(model.book._id) > -1) {
                model.bookshelfPart = 'Have read';
            }
        }

        function getLibriReviews() {
            ReviewService
                .findReviewsByBook(model.book._id)
                .then(
                    function (response) {
                        model.book.reviews = response.data;
                    });
        }

        function postReview() {
            model.currentUserReview.reviewer = {
                _id: model.user._id,
                name: model.user.username
            };
            model.currentUserReview.onBook = model.book._id;
            ReviewService
                .createReview(model.currentUserReview)
                .then(
                    function (response) {
                        $route.reload();
                    }
                );
        }

        function goToReview() {
            $anchorScroll('userReview');
        }

        function getSearchText() {
            if (model.searchText) {
                return model.searchText.replace(/\s/g, '+');
            }
        }

        function updateRating() {
            if (model.currentUserHasReview) {
                ReviewService
                    .updateRating(model.currentUserReview._id, model.currentUserReview.rating)
                    .then(
                        function (response) {
                            model.ratingMessage = "saved!"
                        }
                    );
            } else {
                model.currentUserReview.reviewer = {
                    _id: model.user._id,
                    name: model.user.username
                };
                model.currentUserReview.onBook = model.book._id;
                ReviewService
                    .createRatingReview(model.currentUserReview)
                    .then(
                        function (response) {
                            model.ratingMessage = "saved!"
                        }
                    );
            }
        }

        function updateReview() {
            ReviewService
                .updateReview(model.currentUserReview._id, model.currentUserReview)
                .then(
                    function (response) {
                        model.showReviewEditor = false;
                    }
                );
        }

        function claimThisBook() {
            UserService
                .claimBook(model.book._id)
                .then(
                    function (response){
                        model.book.isClaimed = true;
                    }
                );
        }

        function putBookOnBookshelf(bookshelfPart) {
            if (!model.user){
                $location.url('/login');
            }
            UserService
                .putBookOnBookshelf(model.book._id, bookshelfPart)
                .then(
                    function (response) {
                        if (bookshelfPart === 'WANTTOREAD') {
                            model.bookshelfPart = 'Want to Read';
                        } else if (bookshelfPart === 'READING') {
                            model.bookshelfPart = 'Reading';
                        } else if (bookshelfPart === 'HAVEREAD') {
                            model.bookshelfPart = 'Have read';
                        }
                    }
                );
        }

        function trustThisContent(html) {
            return $sce.trustAsHtml(html);
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url('/');
                    }
                );
        }
    }
})();