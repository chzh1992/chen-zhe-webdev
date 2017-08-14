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

        function searchGoodreads(searchText,pageNumber){
            var url = "/api/project/search/goodreads/" + searchText + '/' + pageNumber.toString();
            return $http.get(url);
        }

        function searchGoodreadsById(goodreadsId){
            var url = "/api/project/goodreads/" + goodreadsId;
            return $http.get(url);
        }
    }
})();