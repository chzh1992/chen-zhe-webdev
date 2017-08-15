(function (){
    angular
        .module('Libri')
        .controller('SearchResultController',SearchResultController);

    function SearchResultController(BookService,$routeParams,GoodreadsService,UserService,$location){
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

        function goodreadsPageChanged(){
            GoodreadsService
                .searchGoodreads(getSearchText(),model.currentGoodreadsPage)
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
