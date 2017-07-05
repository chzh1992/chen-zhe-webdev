(function (){
    angular
        .module('WebAppMaker')
        .controller('PageListController',PageListController);

    function PageListController($routeParams,PageService){
        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];

        function init(){
            PageService
                .findPagesByWebsiteId(model.websiteId)
                .then(function (response) {
                    model.pages = response.data;
                });
        }
        init();
    }
})();