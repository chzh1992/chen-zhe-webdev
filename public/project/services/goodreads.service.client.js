(function (){
    angular
        .module('Libri')
        .factory('GoodreadsService',GoodreadsService);

    function GoodreadsService($http){
        var api = {
            searchGoodreads: searchGoodreads,
            searchGoodreadsById: searchGoodreadsById
        };
        return api;

        function searchGoodreads(searchText){
            var url = "/api/project/search/" + searchText;
            return $http.get(url);
        }

        function searchGoodreadsById(goodreadsId){
            var url = "/api/project/book/" + goodreadsId;
            return $http.get(url);
        }

    }

})();