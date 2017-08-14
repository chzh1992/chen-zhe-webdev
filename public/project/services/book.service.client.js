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
            getWorkInformation: getWorkInformation,
            importGoodreadsBook: importGoodreadsBook,
            updateBook: updateBook,
            deleteBook: deleteBook
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

        function importGoodreadsBook(goodreadsBook){
            var url = "/api/project/book/goodreads";
            return $http.post(url,goodreadsBook);
        }

        function getWorkInformation(libriId){
            var url = "/api/project/work/" + libriId;
            return $http.get(url);
        }

        function updateBook(libriId,book){
            var url = "/api/project/book/" + libriId;
            return $http.put(url,book);
        }

        function adminSearch(searchText){
            var url = "/api/project/admin/search/book/" + searchText;
            return $http.get(url);
        }

        function deleteBook(libriId){
            var url = "/api/project/book/" + libriId;
            return $http.delete(url);
        }
    }
})();