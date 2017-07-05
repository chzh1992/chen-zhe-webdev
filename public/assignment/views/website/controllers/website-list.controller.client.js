(function (){
    angular
        .module('WebAppMaker')
        .controller('WebsiteListController',WebsiteListController);

    function WebsiteListController($routeParams,WebsiteService){
        var model = this;
        model.userId = $routeParams['uid'];

        function init(){
            WebsiteService
                .findWebsitesByUser(model.userId)
                .then(function (response) {
                    model.websites = response.data;
                });
        }
        init();
    }
})();