(function (){
    angular
        .module('Libri')
        .factory('BookService',BookService);

    function BookService($http){
        var api = {
            findBooksByTerm: findBooksByTerm,
            findBookById : findBookById,
            findBookByGoodreadsId: findBookByGoodreadsId,
            createBook: createBook
        };
        return api;

        function findBooksByTerm(searchTerm){
            var url = "/api/search/" + searchTerm;
            return $http.get(url);
        }

        function findBookById(libriId){

        }

        function findBookByGoodreadsId(goodreadsId){

        }

        function createBook(libriId){

        }


    }
})();