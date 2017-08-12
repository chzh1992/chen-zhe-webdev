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
            getUserProfileById: getUserProfileById,
            following: following,
            getUserFollowers: getUserFollowers,
            populateUserInformation: populateUserInformation,
            claimBook: claimBook
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

        function getUserProfileById(userId){
            var url = '/api/project/profile/'+userId;
            return $http.get(url);
        }

        function following(userId,status){
            var url = '/api/project/following/' + userId;
            return $http.put(url,status);
        }

        function getUserFollowers(userId){
            var url = '/api/project/followers/' + userId;
            return $http.get(url);
        }

        function populateUserInformation(){
            var url = '/api/project/personal-page';
            return $http.get(url);
        }

        function claimBook(libriId){

        }
    }
})();