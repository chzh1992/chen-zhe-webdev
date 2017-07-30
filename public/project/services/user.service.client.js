(function (){
    angular
        .module('Libri')
        .factory('UserService',UserService);

    function UserService($http){
        var api = {
            checkLoggedIn: checkLoggedIn
        };
        return api;

        function checkLoggedIn(){
            var url = "/api/project/checkLoggedIn";
            return $http.get(url);
        }
    }
})();