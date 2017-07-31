(function (){
    angular
        .module('Libri')
        .factory('UserService',UserService);

    function UserService($http){
        var api = {
            checkLoggedIn: checkLoggedIn,
            login: login,
            register: register
        };
        return api;

        function checkLoggedIn(){
            var url = "/api/project/checkLoggedIn";
            return $http.get(url);
        }

        function login(){

        }

        function register(){

        }
    }
})();