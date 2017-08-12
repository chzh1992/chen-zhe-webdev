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
            getAuthorWorks: getAuthorWorks
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

        function putBookOnBookshelf(book,bookshelfPart){
            var url = '/api/project/bookshelf/'+bookshelfPart;
            return $http.put(url,book);
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
            var url = '/api/project/claim';
            return $http.put(url,libriId);
        }

        function toggleFollowingStatus(userId){
            var url= '/api/project/follow';
            return $http.put(url,userId);
        }

        function isUserFollowed(userId) {
            var url = '/api/project/isFollowing/'+userId;
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

    }
})();