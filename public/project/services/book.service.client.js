(function (){
    angular
        .module('Libri')
        .factory('BookService',BookService);

    function BookService($http){
        var api = {
            findBooksByTerm: findBooksByTerm,
            findBookByGoodreadsId: findBookByGoodreadsId,
            getWorkInformation: getWorkInformation,
            importGoodreadsBook: importGoodreadsBook,
            getPopBooks: getPopBooks,
            getNewBooks: getNewBooks,
            getQuote: getQuote,

            findBookById : findBookById,
            createBook: createBook,
            updateBook: updateBook,
            deleteBook: deleteBook,
            findAllBooks: findAllBooks
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

        function deleteBook(libriId){
            var url = "/api/project/book/" + libriId;
            return $http.delete(url);
        }

        function findAllBooks(libriId){
            var url = '/api/project/book';
            return $http.get(url);
        }

        function getNewBooks(){
            var url = '/api/project/newBooks';
            return $http.get(url);
        }

        function getPopBooks(){
            var url = "/api/project/popBooks";
            return $http.get(url);
        }

        function getQuote(){
            var url = "/api/project/quote";
            return $http.get(url);
        }
    }
})();