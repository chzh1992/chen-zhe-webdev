(function (){
    angular
        .module('Libri')
        .controller('SearchResultController',SearchResultController);

    function SearchResultController(BookService,$routeParams){
        var model = this;
        var searchText = $routeParams['searchText'];

        function init(){
            BookService
                .searchGoodreads(searchText)
                .then(
                    function (response){
                        model.books = response.data;
                    }
                )
        }
        init();

    }

})();
