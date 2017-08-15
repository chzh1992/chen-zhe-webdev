(function (){
    angular
        .module('Libri')
        .controller('PublicProfileController',PublicProfileController);

    function PublicProfileController(UserService,$routeParams,$location,ReviewService){
        var model = this;

        model.getSearchText = getSearchText;
        model.toggleFollowingStatus = toggleFollowingStatus;
        model.logout = logout;

        function init(){
            var userId = $routeParams['userId'];
            UserService
                .getUserPublicProfile(userId)
                .then(
                    function (response){
                        model.user = response.data;
                        getUserBookNumber();
                        getUserReviews();
                        getUserFollowerNumber();
                        if (model.user.role == 'AUTHOR'){
                            model.user.workNumber = model.user.authoredBooks.length;
                        }
                    }
                );
            UserService
                .checkLoggedIn()
                .then(
                    function (response){
                        model.viewer = response.data;
                        UserService
                            .isUserFollowed(userId)
                            .then(
                                function  (response){
                                    model.isUserFollowed = response.data.value;
                                }
                            );
                    }
                );
        }
        init();

        function getUserBookNumber(){
            model.user.bookNumber = model.user.bookshelf.wantToRead.length +
                model.user.bookshelf.reading.length +
                model.user.bookshelf.haveRead.length;
        }

        function getUserFollowerNumber(){
            UserService
                .getUserFollowers(model.user._id)
                .then(
                    function (response){
                        model.user.followerNumber = response.data.length;
                    }
                );
        }

        function getUserReviews(){
            ReviewService
                .findReviewsByUser(model.user._id)
                .then(
                    function (response){
                        model.user.reviews = response.data;
                        model.user.reviewNumber = response.data.length;
                    }
                )
        }

        function toggleFollowingStatus(){
            if (!model.viewer){
                $location.url('/login');
            }
            UserService
                .toggleFollowingStatus(model.user._id)
                .then(
                    function (response){
                        UserService
                            .isUserFollowed(model.user._id)
                            .then(
                                function  (response){
                                    model.isUserFollowed = response.data.value;
                                }
                            );
                    }
                );
        }

        function getSearchText(){
            if (model.searchText){
                return model.searchText.replace(/\s/g,'+');
            }
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