(function (){
    angular
        .module('Libri')
        .controller('PublicProfileController',PublicProfileController);

    function PublicProfileController(UserService,$routeParams,$location){
        var model = this;

        model.getSearchText = getSearchText;
        model.toggleFollowingStatus = toggleFollowingStatus;

        function init(){
            var userId = $routeParams['userId'];
            UserService
                .getUserPublicProfile(userId)
                .then(
                    function (response){
                        model.user = response.data;
                    }
                );
            UserService
                .checkLoggedIn()
                .then(
                    function (response){
                        model.viewer = response.data;
                        model.isUserFollowed = getUserFollowingStatus();
                    }
                )
        }
        init();

        function getUserFollowingStatus(){
            return UserService
                .isUserFollowed(userId)
                .then(
                    function  (response){
                        return response.data.value;
                    }
                );
        }


        function toggleFollowingStatus(){
            UserService
                .toggleFollowingStatus(model.user._id)
                .then(
                    function (response){
                        model.isUserFollowed = getUserFollowingStatus();
                    }
                );
        }

        function getSearchText(){
            if (model.searchText){
                return model.searchText.replace(/\s/g,'+');
            }
        }

    }

})();