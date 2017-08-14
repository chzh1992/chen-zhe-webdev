(function (){
    angular
        .module('Libri')
        .factory('UserService',UserService);

    function UserService($http){
        var api = {
            checkLoggedIn: checkLoggedIn,
            login: login,
            register: register,
            logout: logout,
            isUsernameAvailable: isUsernameAvailable,
            putBookOnBookshelf: putBookOnBookshelf,
            getUserPublicProfile: getUserPublicProfile,
            claimBook: claimBook,
            toggleFollowingStatus: toggleFollowingStatus,
            isUserFollowed: isUserFollowed,
            getUserPersonalProfile: getUserPersonalProfile,
            getUserBookshelf: getUserBookshelf,
            getUserNews: getUserNews,
            getAuthorWorks: getAuthorWorks,
            getUserFollowers: getUserFollowers,
            updateProfile: updateProfile,
            getWantToReadNumber: getWantToReadNumber,
            getReadingNumber: getReadingNumber,
            getHaveReadNumber: getHaveReadNumber,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser

        };
        return api;

        function checkLoggedIn(){
            var url = "/api/project/checkLoggedIn";
            return $http.get(url);
        }

        function login(user){
            var url = '/api/project/login';
            return $http.post(url,user);
        }

        function register(user){
            var url = '/api/project/register';
            return $http.post(url,user);
        }

        function isUsernameAvailable(username){
            var url = '/api/project/isAvailable/' + username;
            return $http.get(url)
        }

        function putBookOnBookshelf(libriId,bookshelfPart){
            var url = '/api/project/bookshelf/'+ bookshelfPart + '/' + libriId;
            return $http.put(url);
        }

        function logout(){
            var url = '/api/project/logout';
            return $http.post(url);
        }

        function getUserPublicProfile(userId){
            var url = '/api/project/profile/'+userId;
            return $http.get(url);
        }

        function claimBook(libriId){
            var url = '/api/project/claim/' + libriId;
            return $http.put(url);
        }

        function toggleFollowingStatus(userId){
            var url= '/api/project/follow/' + userId;
            return $http.put(url);
        }

        function isUserFollowed(userId){
            var url = '/api/project/isFollowing/' + userId;
            return $http.get(url);
        }

        function getUserPersonalProfile(){
            var url = '/api/project/personal-page/profile';
            return $http.get(url);
        }

        function getUserBookshelf(){
            var url = '/api/project/personal-page/bookshelf';
            return $http.get(url);
        }

        function getUserNews(){
            var url = '/api/project/personal-page/news';
            return $http.get(url);
        }

        function getAuthorWorks(){
            var url = '/api/project/personal-page/works';
            return $http.get(url);
        }

        function getUserFollowers(){
            var url = '/api/project/followers';
            return $http.get(url);
        }

        function updateProfile(userId,profile){
            var url = '/api/project/profile/' + userId;
            return $http.put(url,profile);
        }

        function getWantToReadNumber(libriId){
            var url = '/api/project/number/wantToRead/' + libriId;
            return $http.get(url);
        }

        function getReadingNumber(libriId){
            var url = '/api/project/number/reading/' + libriId;
            return $http.get(url);
        }

        function getHaveReadNumber(libriId){
            var url = '/api/project/number/haveRead/' + libriId;
            return $http.get(url);
        }

        function findUserById(userId){
            var url = '/api/project/user/' + userId;
            return $http.get(url);
        }

        function updateUser(userId,user){
            var url = '/api/project/user/' + userId;
            return $http.put(url,user);
        }

        function deleteUser(userId){
            var url = '/api/project/user/' + userId;
            return $http.delete(url);
        }
    }
})();