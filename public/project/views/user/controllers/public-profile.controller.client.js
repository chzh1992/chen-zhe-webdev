(function (){
    angular
        .module('Libri')
        .controller('PublicProfileController',PublicProfileController);

    function PublicProfileController(UserService,$routeParams,$location){
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
                        model.user.bookNumber = getUserBookNumber(model.user);
                        if (model.user.role == 'AUTHOR'){
                            model.user.workNumber = model.user.authoredBooks.length;
                            model.user.mostAdmiredWork = getMostAdmiredWork(model.user.authoredBooks);
                            model.user.averageRating = getAverageRating(model.user.authoredBooks);
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

        function getUserBookNumber(user){
            return user.bookshelf.wantToRead.length +
                user.bookshelf.reading.length +
                user.bookshelf.haveRead.length;
        }

        function getMostAdmiredWork(works){
            var mostAdmiredWork = {average_rating: 0};
            for (var work in works){
                if (works[work].average_rating > mostAdmiredWork.average_rating){
                    mostAdmiredWork = works[work];
                }
            }
            return mostAdmiredWork;
        }

        function getAverageRating(works){
            var totalScore = 0;
            for (var work in works){
                totalScore += Number(works[work].average_rating);
            }
            return works.length === 0? 0 : totalScore/works.length;
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