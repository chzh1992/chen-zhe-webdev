(function (){
    angular
        .module('Libri')
        .factory('UserService',UserService);

    function UserService($http){
        var api = {
            checkLoggedIn: checkLoggedIn,
            login: login,
            register: register,
            isUsernameAvailable: isUsernameAvailable,
            findAssociatedUsersByUser: findAssociatedUsersByUser
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

        function findAssociatedUsersByUser(userId){
            var url = '/api/project/social-network/' + userId;
            return $http.get(url);
        }
    }
})();