(function (){
    angular
        .module('Libri')
        .controller('SearchResultController',SearchResultController);

    function SearchResultController(BookService,$routeParams,GoodreadsService,UserService,$location,ReviewService){
        var model = this;
        var initSearchText = $routeParams['searchText'];

        model.goodreadsPageChanged = goodreadsPageChanged;
        model.getSearchText = getSearchText;
        model.logout = logout;

        function init(){
            GoodreadsService
                .searchGoodreads(initSearchText,1)
                .then(
                    function (response){
                        model.goodreadsBooks = response.data.work;
                        model.totalGoodreadsResults = response.data.total;
                        model.currentGoodreadsPage = 1;
                    },function (error){}
                );
            BookService
                .findBooksByTerm(initSearchText)
                .then(
                    function (response){
                        model.libriBooks = response.data;
                        for (var book in model.libriBooks){
                            getLibriRating(model.libriBooks[book]);
                        }
                    },function (error){}
                );
            UserService
                .checkLoggedIn()
                .then(
                    function (response){
                        model.user = response.data;
                    }
                )
        }
        init();

        function getLibriRating(book){
            ReviewService
                .getAverageRating(book._id)
                .then(
                    function (response){
                        book.average_rating = response.data.rating;
                    }
                )
        }

        function goodreadsPageChanged(){
            GoodreadsService
                .searchGoodreads(initSearchText,model.currentGoodreadsPage)
                .then(
                    function (response){
                        model.goodreadsBooks = response.data.work;
                        model.totalGoodreadsResults = response.data.total;
                    }
                );
        }

        function getSearchText(){
            if (model.searchText){
                return model.searchText.replace(/\s/g,'+');
            }
        }

        function logout(){
            UserService
                .logout()
                .then(
                    function (response){
                        $location.url('/');
                    }
                );
        }
    }
})();
