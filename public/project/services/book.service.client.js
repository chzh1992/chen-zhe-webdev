(function (){
    angular
        .module('Libri')
        .factory('BookService',BookService);

    function BookService($http){
        var api = {
            findBooksByTerm: findBooksByTerm
        };
        return api;

        function findBooksByTerm(searchTerm){
            var url = "/api/search/" + searchTerm;
            return $http.get(url);
        }
    }
})();