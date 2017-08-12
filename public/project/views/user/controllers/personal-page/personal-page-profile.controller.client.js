(function (){
    angular
        .module('Libri')
        .controller('PersonalPageProfileController',PersonalPageProfileController);

    function PersonalPageProfileController(UserService){
        var model = this;

        model.getSearchText = getSearchText;
        model.logout = logout;
        model.updateProfile = updateProfile;
        model.stopFollowing = stopFollowing;

        function init(){
            UserService
                .getUserPersonalProfile()
                .then(
                    function (response){
                        model.user = response.data;
                    }
                )
        }
        init();

        function logout(){
            UserService
                .logout()
                .then(
                    function (response){
                        $location.url('/');
                    }
                );
        }

        function getSearchText(){
            if (model.searchText){
                return model.searchText.replace(/\s/g,'+');
            }
        }

        function updateProfile(){
            UserService
                .updateProfile(model.user)
                .then(
                    function (response){
                        model.message = 'Successfully Updated!';
                    }
                );
        }

        function stopFollowing(userId){
            UserService
                .toggleFollowingStatus(userId)
                .then(
                    function (response){
                        removeUserFromFollowing(userId);
                    }
                );
        }

        function removeUserFromFollowing(userId){
            var followingUsers = model.user.following;
            var index;
            for (var user in followingUsers){
                if (followingUsers[user]._id === userId){
                    index = user;
                    break;
                }
            }
            followingUsers.splice(index,1);
        }

    }

})();