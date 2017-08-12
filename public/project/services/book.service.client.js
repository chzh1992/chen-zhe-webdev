(function (){
    angular
        .module('Libri')
        .factory('BookService',BookService);

    function BookService($http){
        var api = {
            findBooksByTerm: findBooksByTerm,
            findBookById : findBookById,
            findBookByGoodreadsId: findBookByGoodreadsId,
            createBook: createBook,
            getWorkInformation: getWorkInformation
        };
        return api;

        function findBooksByTerm(searchTerm){
            var url = "/api/search/" + searchTerm;
            return $http.get(url);
        }

        function findBookById(libriId){
            var url = "/api/project/book/" + libriId;
            return $http.get(url);
        }

        function findBookByGoodreadsId(goodreadsId){
            var url = "/api/project/book/goodreads/" + goodreadsId;
            return $http.get(url);
        }

        function createBook(book){
            var url = "/api/project/book";
            return $http.post(url,book);
        }

        function getWorkInformation(libriId){
            var url = "/api/project/work/" + libriId;
            return $http.get(url);
        }
    }
})();