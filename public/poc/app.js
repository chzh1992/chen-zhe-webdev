(function (){
    angular
        .module("WdPoc",[])
        .controller("PocController",PocController);

    function PocController($http,$sce){
        var model = this;
        model.searchGoodreads = searchGoodreads;
        model.getBookDetails = getBookDetails;

        function searchGoodreads(){
            $http
                .get("/api/poc/books/"+model.searchText)
                .then(function (response) {
                    model.books = response.data;
                })
        }

        function getBookDetails(book){
            $http
                .get("/api/poc/bookdetails/" + book.best_book[0].id[0]._)
                .then(function(response){
                    model.book = response.data;
                    model.book.reviews_widget = $sce.trustAsHtml(model.book.reviews_widget[0].replace('\n',''));
                    model.book.description = $sce.trustAsHtml(model.book.description[0]);
                })

        }
    }
})();