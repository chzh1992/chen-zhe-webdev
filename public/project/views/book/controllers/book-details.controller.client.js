(function (){
    angular
        .module('Libri')
        .controller('BookDetailsController',BookDetailsController);

    function BookDetailsController($routeParams,$http,$sce,GoodreadsService){
        var model = this;
        var goodreadsId = $routeParams['goodreadsId'];

        function init(){
            GoodreadsService
                .searchGoodreadsById(goodreadsId)
                .then(
                    function (response){
                        model.book = response.data;
                        model.book.reviews_widget = $sce.trustAsHtml(model.book.reviews_widget[0].replace('\n',''));
                        model.book.description = $sce.trustAsHtml(model.book.description[0]);
                    }
                );
        }
        init();


    }
})();