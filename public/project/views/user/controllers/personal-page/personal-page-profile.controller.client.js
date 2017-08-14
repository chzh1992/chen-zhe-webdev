(function (){
    angular
        .module('Libri')
        .controller('PersonalPageProfileController',PersonalPageProfileController);

    function PersonalPageProfileController(UserService,$location){
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
                        for (var following in model.user.following){
                            model.user.following[following].bookNumber = getUserBookNumber(model.user.following[following]);
                        }
                        getUserFollowers();
                    }
                );
        }
        init();

        function getUserFollowers(){
            UserService
                .getUserFollowers()
                .then(
                    function (response) {
                        model.user.followers = response.data;
                        for (var follower in model.user.followers) {
                            model.user.followers[follower].bookNumber = getUserBookNumber(model.user.followers[follower]);
                        }
                    }
                );
        }

        function getUserBookNumber(user){
            return user.bookshelf.wantToRead.length + user.bookshelf.reading.length + user.bookshelf.haveRead.length;
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

        function getSearchText(){
            if (model.searchText){
                return model.searchText.replace(/\s/g,'+');
            }
        }

        function updateProfile(){
            UserService
                .updateProfile(model.user._id,model.user)
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