(function (){
    angular
        .module('Libri')
        .controller('PublicProfileController',PublicProfileController);

    function PublicProfileController(UserService,$routeParams,$location){
        var model = this;

        model.getSearchText = getSearchText;
        model.isUserFollowed = isUserFollowed;
        model.viewerFollowUser = viewerFollowUser;
        model.viewerUnfollowUser = viewerUnfollowUser;

        function init(){
            var userId = $routeParams['userId'];
            UserService
                .getUserProfileById(userId)
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
                    }
                )
        }
        init();

        function isUserFollowed(){
            if (model.viewer){
                return model.viewer.following.indexOf(model.user._id) > -1;
            }
            return false;
        }

        function viewerFollowUser(){
            UserService
                .following(model.user._id,{value: true})
                .then(
                  function (response){

                  },function (error){
                        $location.url('/login');
                      // if (error.message.statusCode == 401){
                      //
                      // }
                    }
                );
        }

        function viewerUnfollowUser(){
            UserService
                .following(model.user._id,{value: false})
                .then(
                    function (response){

                    },function (error){
                        if (error.message.statusCode == 401){
                            $location.url('/login');
                        }
                    }
                );
        }

        function getWorkNumber(){

        }

        function getMostAdmiredWork(){

        }

        function getAuthorAverageRating(){

        }

        function getSearchText(){
            if (model.searchText){
                return model.searchText.replace(/\s/g,'+');
            }
        }

    }

})();