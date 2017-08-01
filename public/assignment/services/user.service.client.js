(function (){
    angular
        .module('WebAppMaker')
        .factory('UserService',UserService);

    function UserService($http){
        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            logout: logout,
            register: register,
            checkLoggedIn: checkLoggedIn
        };
        return api;

        function createUser(user){
            var url = "/api/user";
            return $http.post(url,user);
        }

        function findUserById(userId){
            var url = "/api/user/" + userId;
            return $http.get(url);
        }

        function findUserByUsername(username){
            var url = "/api/username?username=" + username;
            return $http.get(url);
        }

        function findUserByCredentials(username,password){
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url);
        }

        function updateUser(userId,user){
            var url = "/api/user/" + userId;
            return $http.put(url,user);
        }

        function deleteUser(userId){
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }

        function login(user){
            var url = "/api/login";
            return $http.post(url, user);
        }

        function logout(){
            var url = "/api/logout";
            return $http.post(url);
        }

        function register(user){
            var url = "/api/register";
            return $http.post(url,user);
        }

        function checkLoggedIn(){
            var url = "/api/loggedin";
            return $http.get(url);
        }
    }
})();