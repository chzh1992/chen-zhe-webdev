(function (){
    angular
        .module('Libri')
        .controller('SearchResultController',SearchResultController);

    function SearchResultController(GoodreadsService,$routeParams){
        var model = this;
        var searchText = $routeParams['searchText'];

        function init(){
            GoodreadsService
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
