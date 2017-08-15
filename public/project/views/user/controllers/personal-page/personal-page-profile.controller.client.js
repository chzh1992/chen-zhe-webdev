(function (){
    angular
        .module('Libri')
        .controller('PersonalPageProfileController',PersonalPageProfileController);

    function PersonalPageProfileController(UserService,$location,ReviewService){
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
                            getUserBookNumber(model.user.following[following]);
                            getUserFollowerNumber(model.user.following[following]);
                            getuserReviewNumber(model.user.following[following]);
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
                            getUserBookNumber(model.user.followers[follower]);
                            getUserFollowerNumber(model.user.followers[follower]);
                            getUserReviewNumber(model.user.followers[follower]);
                        }
                    }
                );
        }

        function getUserBookNumber(user){
            user.bookNumber = user.bookshelf.wantToRead.length + user.bookshelf.reading.length + user.bookshelf.haveRead.length;
        }

        function getUserFollowerNumber(user){
            UserService
                .getUserFollowers(user._id)
                .then(
                    function (response){
                        user.followerNumber = response.data.length;
                    }
                )
        }

        function getUserReviewNumber(user){
            ReviewService
                .findReviewsByUser(user._id)
                .then(
                    function(response){
                        user.reviewNumber = response.data.length;
                    }
                )
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