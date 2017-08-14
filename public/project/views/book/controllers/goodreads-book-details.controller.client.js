(function (){
    angular
        .module('Libri')
        .controller('GoodreadsBookDetailsController',GoodreadsBookDetailsController);

    function GoodreadsBookDetailsController($routeParams,$sce,BookService,GoodreadsService,UserService,ReviewService,$location) {
        var model = this;

        var goodreadsId = $routeParams['goodreadsId'];

        model.getSearchText = getSearchText;
        model.getLibriRating = getLibriRating;
        model.importGoodreadsBook = importGoodreadsBook;
        model.trustThisContent = trustThisContent;
        model.logout = logout;

        function init() {
            GoodreadsService
                .searchGoodreadsById(goodreadsId)
                .then(
                    function (response) {
                        model.book = response.data;
                        model.isCollapsed = true;
                    }
                );
            BookService
                .findBookByGoodreadsId(goodreadsId)
                .then(
                    function (response){
                        model.libriId = response.data._id;
                        getLibriRating();
                    },function (err){
                        model.libriId = '-1';
                    }
                );
        }
        init();

        function getLibriRating() {
            return ReviewService
                .getAverageRating(model.libriId)
                .then(
                    function (response) {
                        return response.data;
                    }
                );
        }

        function getSearchText() {
            if (model.searchText) {
                return model.searchText.replace(/\s/g, '+');
            }
        }

        function importGoodreadsBook() {
            BookService
                .importGoodreadsBook(model.book)
                .then(
                    function (response){
                        model.libriId = response.data._id;
                    }
                );
        }

        function trustThisContent(html) {
            return $sce.trustAsHtml(html);
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url('/');
                    }
                );
        }
    }
})();