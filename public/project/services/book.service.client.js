(function (){
    angular
        .module('Libri')
        .factory('BookService',BookService);

    function BookService($http){
        var api = {
            searchGoodreads: searchGoodreads,
            searchBookByGoodreadsId: searchBookByGoodreadsId,
            findBookById: findBookById
        };
        return api;

        function searchGoodreads(searchText){
            var url = "/api/project/search/" + searchText;
            return $http.get(url);
        }

        function searchBookByGoodreadsId(goodreadsId){
            var url = "/api/project/book/goodreads/" + goodreadsId;
            return $http.get(url);
        }

    }

})();